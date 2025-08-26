import { useState, useEffect, useRef, useCallback } from "react";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://anchorpoint-api.onrender.com',
    withCredentials: true
});

const ProjectPageMain = () => {
    const router = useNavigate();
    
    const [galleryState, setGalleryState] = useState({
        opened: false,
        activeUrl: null,
        imageIndex: null,
        currentSection: 'all'
    });

    const [activeTabIndicator, setActiveTabIndicator] = useState({ width: 0, left: 0 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    const tabsRef = useRef([]);
    const galleryRef = useRef(null);

    const sections = [
        { id: 'all', name: 'All' },
        { id: 'residential', name: 'Residential' },
        { id: 'commercial', name: 'Commercial' },
        { id: 'architectural', name: 'Architectural' },
        { id: 'other', name: 'Others' }
    ];

    const [images, setImages] = useState([]);
    const [projects, setProjects] = useState([]);

    // Check if device is mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    useEffect(() => {
        async function fetchProject() {
            try {
                setIsLoading(true); // Start loading
                const response = await api.get('/api/v1/projects');
                const result = response.data;

                if (result.success && result.data) {
                    let projectsData = [];

                    if (Array.isArray(result.data)) {
                        // Case: multiple projects
                        projectsData = result.data;
                    } else {
                        // Case: single project
                        projectsData = [result.data];
                    }

                    setProjects(projectsData);
                  
                    const transformedImages = projectsData
                        .filter(project => project.images && project.images.length > 0)
                        .map(project => ({
                            src: project.images[0].src, 
                            aspect: "4/3",
                            section: project.category,
                            name: project.title,
                            projectId: project._id || project.id 
                        }));

                    setImages(transformedImages);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setIsLoading(false); // Stop loading regardless of success/error
            }
        }

        fetchProject();
    }, []);

    const filteredImages = useCallback(() => {
        return galleryState.currentSection === 'all'
            ? images
            : images.filter(img => img.section === galleryState.currentSection);
    }, [galleryState.currentSection, images]);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!galleryState.opened || !touchStartX.current || !touchEndX.current) return;
        
        const diff = touchStartX.current - touchEndX.current;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
               
                handleNext();
            } else {
    
                handlePrev();
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!galleryState.opened) return;

            switch (e.key) {
                case 'ArrowRight': e.preventDefault(); handleNext(); break;
                case 'ArrowLeft': e.preventDefault(); handlePrev(); break;
                case 'Escape': handleClose(); break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [galleryState.opened, galleryState.imageIndex, galleryState.currentSection]);

    const updateTabIndicator = useCallback(() => {
        const activeTabIndex = sections.findIndex(s => s.id === galleryState.currentSection);
        if (tabsRef.current[activeTabIndex]) {
            const tab = tabsRef.current[activeTabIndex];
            setActiveTabIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
        }
    }, [galleryState.currentSection]);

    useEffect(() => {
        const raf = requestAnimationFrame(updateTabIndicator);
        return () => cancelAnimationFrame(raf);
    }, [updateTabIndicator]);

    const handleOpen = useCallback((e, index) => {
        setGalleryState(prev => ({
            ...prev,
            opened: true,
            activeUrl: filteredImages()[index].src,
            imageIndex: index
        }));
    }, [filteredImages]);

    const handleClose = useCallback(() => {
        setGalleryState(prev => ({ ...prev, opened: false }));
        setTimeout(() => {
            setGalleryState(prev => ({ ...prev, activeUrl: null, imageIndex: null }));
        }, 300);
    }, []);

    const handleNext = useCallback(() => {
        const imgs = filteredImages();
        const nextIndex = (galleryState.imageIndex + 1) % imgs.length;
        setGalleryState(prev => ({
            ...prev,
            imageIndex: nextIndex,
            activeUrl: imgs[nextIndex].src
        }));
    }, [galleryState.imageIndex, filteredImages]);

    const handlePrev = useCallback(() => {
        const imgs = filteredImages();
        const prevIndex = (galleryState.imageIndex - 1 + imgs.length) % imgs.length;
        setGalleryState(prev => ({
            ...prev,
            imageIndex: prevIndex,
            activeUrl: imgs[prevIndex].src
        }));
    }, [galleryState.imageIndex, filteredImages]);

    const handleViewProject = useCallback((projectId) => {
        router(`/images/${projectId}`);
    }, [router]);

    const changeSection = useCallback((sectionId) => {
        if (isTransitioning || sectionId === galleryState.currentSection) return;

        setIsTransitioning(true);
        setGalleryState(prev => ({
            ...prev,
            currentSection: sectionId,
            opened: false,
            activeUrl: null,
            imageIndex: null
        }));

        const timer = setTimeout(() => setIsTransitioning(false), 300);
        return () => clearTimeout(timer);
    }, [isTransitioning, galleryState.currentSection]);

    
    const breakpointColumnsObj = { 
        default: 4, 
        1280: 3, 
        1024: 3,
        768: 2, 
        640: 2,
        500: 1 
    };

    // Generate skeleton loaders based on screen size
    const generateSkeletons = () => {
        const count = isMobile ? 6 : 12;
        return Array.from({ length: count }).map((_, index) => (
            <div 
                key={index}
                className="mb-3 sm:mb-4 relative"
                style={{ aspectRatio: "4/3" }}
            >
                <div className="w-full h-full rounded-lg bg-gray-200 overflow-hidden relative">
                    <div className="shimmer"></div>
                </div>
            </div>
        ));
    };

    return (
        <div className="w-full h-full select-none p-4 sm:p-6">
            
            {isMobile && (
                <div className="mb-6 md:hidden">
                    <select 
                        value={galleryState.currentSection}
                        onChange={(e) => changeSection(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                        {sections.map(section => (
                            <option key={section.id} value={section.id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

           
            {!isMobile && (
                <div className="relative flex justify-center mb-8 border-b border-gray-200">
                    <div className="flex space-x-4 md:space-x-8">
                        {sections.map((section, index) => (
                            <button
                                key={section.id}
                                ref={el => tabsRef.current[index] = el}
                                onClick={() => changeSection(section.id)}
                                className={`pb-4 px-1 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                                    galleryState.currentSection === section.id
                                        ? 'text-black'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                    <div 
                        className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
                        style={{
                            width: `${activeTabIndicator.width}px`,
                            left: `${activeTabIndicator.left}px`,
                            willChange: 'width, left',
                            transform: 'translateZ(0)'
                        }}
                    />
                </div>
            )}

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex w-auto -ml-2 sm:-ml-4"
                columnClassName="pl-2 sm:pl-4 bg-clip-padding"
            >
                {isLoading ? (
                    // Show skeleton loaders while loading
                    generateSkeletons()
                ) : (
                    // Show actual images when loaded
                    filteredImages().map((img, index) => (
                        <div 
                            key={index}
                            className="mb-3 sm:mb-4 transition-all duration-500 relative group"
                            style={{ 
                                aspectRatio: img.aspect,
                                opacity: 0,
                                transform: 'translateY(20px)',
                                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`
                            }}
                        >
                            <img
                                src={img.src}
                                loading="lazy"
                                onClick={(e) => handleOpen(e, index)}
                                alt={`Gallery image ${index + 1}`}
                                className="object-cover w-full h-full rounded-lg cursor-zoom-in bg-gray-200 transition-transform duration-300 hover:scale-105"
                                role="button"
                                tabIndex={0}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white font-medium text-xs sm:text-sm">{img.name}</h3>
                           
                            </div>
                        </div>
                    ))
                )}
            </Masonry>

            {!isLoading && filteredImages().length === 0 && !isTransitioning && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">No projects found</p>
                    <p className="text-sm">Try selecting a different category</p>
                </div>
            )}

            {galleryState.opened && (
                <div
                    onClick={handleClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 select-none cursor-zoom-out"
                    style={{ animation: 'fadeIn 0.3s ease-in-out' }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative flex items-center justify-center w-full h-full p-4 sm:p-6">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                            className="absolute left-2 sm:left-4 flex items-center justify-center text-white rounded-full cursor-pointer bg-white/10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:bg-white/20 z-50"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <div className="relative w-full h-full max-w-6xl">
                            <img
                                className="object-contain object-center w-full h-full select-none cursor-zoom-out"
                                src={galleryState.activeUrl}
                                alt="Expanded view"
                                style={{ animation: 'zoomIn 0.3s ease-in-out' }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white font-medium text-base sm:text-lg">
                                    {filteredImages()[galleryState.imageIndex]?.name}
                                </h3>
                            </div>
                        </div>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-2 sm:right-4 flex items-center justify-center text-white rounded-full cursor-pointer bg-white/10 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 hover:bg-white/20 z-50"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (filteredImages()[galleryState.imageIndex]?.projectId) {
                                    handleViewProject(filteredImages()[galleryState.imageIndex].projectId);
                                }
                            }}
                            className="absolute top-4 right-4 flex items-center justify-center gap-2 text-white rounded-lg cursor-pointer bg-white/10 px-3 py-2 sm:px-4 sm:py-2 hover:bg-white/20 z-50"
                        >
                            <span className="text-xs sm:text-sm">View Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 left-4 flex items-center justify-center text-white rounded-full cursor-pointer bg-white/10 w-8 h-8 sm:w-10 sm:h-10 hover:bg-white/20 z-50"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
                            <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                                {galleryState.imageIndex + 1} / {filteredImages().length}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                /* Shimmer effect for skeleton loading */
                .shimmer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    transform: translateX(-100%);
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.4) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    animation: shimmer 1.5s infinite;
                }
                
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                /* Prevent horizontal scroll on mobile */
                @media (max-width: 640px) {
                    .masonry-grid {
                        margin-left: 0;
                    }
                    
                    .masonry-grid-column {
                        padding-left: 0.5rem;
                    }
                }
            `}</style>
        </div>
    )
}

export default ProjectPageMain;