"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Masonry from "react-masonry-css";

export default function MasonryImageGallery() {
  const [galleryState, setGalleryState] = useState({
    opened: false,
    activeUrl: null,
    imageIndex: null,
    currentSection: 'all'
  });

  const [activeTabIndicator, setActiveTabIndicator] = useState({ width: 0, left: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabsRef = useRef([]);
  const galleryRef = useRef(null);

  const sections = [
    { id: 'all', name: 'All' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'architectural', name: 'Architectural' },
    { id: 'other', name: 'Others' }
  ];

  const images = [
    { src: "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg", aspect: "5/6", section: 'residential' },
    { src: "https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg", aspect: "3/4", section: 'residential' },
    { src: "https://images.unsplash.com/photo-1689217634234-38efb49cb664", aspect: "4/5", section: 'commercial' },
    { src: "https://images.unsplash.com/photo-1520350094754-f0fdcac35c1c", aspect: "16/9", section: 'architectural' },
    { src: "https://cdn.devdojo.com/images/june2023/mountains-10.jpeg", aspect: "3/2", section: 'other' },
    { src: "https://cdn.devdojo.com/images/june2023/mountains-06.jpeg", aspect: "4/3", section: 'other' },
    { src: "https://images.pexels.com/photos/1891234/pexels-photo-1891234.jpeg", aspect: "2/3", section: 'residential' },
    { src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383", aspect: "5/7", section: 'commercial' },
    { src: "https://images.pexels.com/photos/4256852/pexels-photo-4256852.jpeg", aspect: "3/5", section: 'architectural' },
    { src: "https://images.unsplash.com/photo-1541795083-1b160cf4f3d7", aspect: "4/7", section: 'other' },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", aspect: "5/8", section: 'residential' },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", aspect: "8/5", section: 'architectural' }
  ];

  const filteredImages = useCallback(() => {
    return galleryState.currentSection === 'all'
      ? images
      : images.filter(img => img.section === galleryState.currentSection);
  }, [galleryState.currentSection]);

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
    return () => clearTimeout(timer); // Not used, but safe if refactored into useEffect
  }, [isTransitioning, galleryState.currentSection]);

  const breakpointColumnsObj = { default: 4, 1100: 3, 700: 2, 500: 1 };

  return (
    <div className="w-full h-full select-none p-4">
      <div className="relative flex justify-center mb-8 border-b border-gray-200">
        <div className="flex space-x-8">
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

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
        resizeObserver={false}
      >
        {filteredImages().map((img, index) => (
          <div 
            key={index}
            className="mb-4 transition-all duration-500"
            style={{ 
              aspectRatio: img.aspect,
              opacity: 0,
              transform: 'translateY(20px)',
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`
            }}
          >
            <img
              src={img.src}
              loading="lazy"
              onClick={(e) => handleOpen(e, index)}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-full rounded-lg cursor-zoom-in bg-gray-200"
              role="button"
              tabIndex={0}
            />
          </div>
        ))}
      </Masonry>

      {galleryState.opened && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-90 select-none cursor-zoom-out"
          style={{ animation: 'fadeIn 0.3s ease-in-out' }}
        >
          <div className="relative flex items-center justify-center w-11/12 h-5/6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-0 flex items-center justify-center text-white translate-x-4 md:translate-x-10 rounded-full cursor-pointer bg-white/10 w-10 h-10 md:w-14 md:h-14 hover:bg-white/20 z-50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <img
              className="object-contain object-center w-full h-full select-none cursor-zoom-out"
              src={galleryState.activeUrl}
              alt="Expanded view"
              style={{ animation: 'zoomIn 0.3s ease-in-out' }}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-0 flex items-center justify-center text-white -translate-x-4 md:-translate-x-10 rounded-full cursor-pointer bg-white/10 w-10 h-10 md:w-14 md:h-14 hover:bg-white/20 z-50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
              <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {galleryState.imageIndex + 1} / {filteredImages().length}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
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
      `}</style>
    </div>
  );
}
