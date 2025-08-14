import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProjectGalleryPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [galleryState, setGalleryState] = useState({
    opened: false,
    activeImage: null,
    imageIndex: 0,
    showComparison: false
  });


  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef(null);

  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

 
  const project = {
    title: "Modern Residence Transformation",
    location: "Beverly Hills, CA",
    date: "Completed June 2023",
    description: "A complete renovation of a 1980s residence into a modern luxury home with sustainable features and smart home technology.",
    videoSrc: "https://example.com/project-video.mp4",
    images: [
      {
        id: 1,
        title: "Exterior Transformation",
        beforeSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        afterSrc: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        aspect: "16/9",
        tags: ["Exterior", "Landscaping"]
      },
      {
        id: 2,
        title: "Kitchen Remodel",
        beforeSrc: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        afterSrc: "https://images.unsplash.com/photo-1600566752223-8a43d5462c3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        aspect: "4/3",
        tags: ["Interior", "Cabinetry"]
      },
      {
        id: 3,
        title: "Master Bathroom",
        beforeSrc: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        afterSrc: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        aspect: "3/4",
        tags: ["Bathroom", "Tilework"]
      },
      // Add more images as needed
    ]
  };

  // Set up video loop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        videoRef.current.play();
      });
    }
  }, []);

  // Handle mouse movement for controls visibility
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Open image in viewer
  const handleOpen = (index) => {
    setGalleryState(prev => ({
      ...prev,
      opened: true,
      activeImage: project.images[index],
      imageIndex: index,
      showComparison: false
    }));
    document.body.style.overflow = 'hidden';
    setShowControls(true);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Close image viewer
  const handleClose = () => {
    setGalleryState(prev => ({ ...prev, opened: false }));
    document.body.style.overflow = 'auto';
    setIsFullscreen(false);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
  };

  // Navigate between images
  const navigateImage = (direction) => {
    const change = direction === 'next' ? 1 : -1;
    const newIndex = (galleryState.imageIndex + change + project.images.length) % project.images.length;
    setGalleryState(prev => ({
      ...prev,
      activeImage: project.images[newIndex],
      imageIndex: newIndex,
      showComparison: false
    }));
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Comparison slider handlers
  const startDragging = () => {
    setIsDragging(true);
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
  };

  const stopDragging = () => {
    setIsDragging(false);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  const handleSliderMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX || e.touches[0].clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(pos, 0), 100));
  };

  // Set up event listeners
  useEffect(() => {
    if (!galleryState.opened) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === ' ') toggleComparison();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryState.opened, galleryState.imageIndex]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => handleSliderMove(e);
    const handleTouchMove = (e) => handleSliderMove(e);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging]);

  // Toggle comparison view
  const toggleComparison = () => {
    setGalleryState(prev => ({
      ...prev,
      showComparison: !prev.showComparison,
      sliderPosition: 50
    }));
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Masonry layout breakpoints
  const breakpointColumnsObj = { 
    default: 3, 
    1100: 2, 
    700: 1 
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Project Header */}
      <header className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[70vh] object-cover"
        >
          <source src={project.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition backdrop-blur-sm mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Projects</span>
            </button>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-lg">
                <span>{project.location}</span>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                <span>{project.date}</span>
              </div>
              <p className="mt-4 max-w-2xl text-white/90">{project.description}</p>
            </motion.div>
          </div>
        </div>
      </header>

      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Project Gallery</h2>
          <p className="text-gray-600 max-w-3xl">
            Explore the transformation through our before-and-after comparisons. Click on any image to view in detail.
          </p>
        </div>


        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6"
          columnClassName="pl-6"
        >
          {project.images.map((img, index) => (
            <motion.div 
              key={img.id}
              className="mb-6 relative group cursor-pointer"
              onClick={() => handleOpen(index)}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideUp}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ aspectRatio: img.aspect }}>
                <img
                  src={img.afterSrc}
                  alt={`After: ${img.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-semibold text-xl">{img.title}</h3>
                  <div className="flex gap-2 mt-3">
                    {img.tags.map((tag, i) => (
                      <span key={i} className="bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-800 text-sm px-3 py-1 rounded-full shadow-sm">
                  Before/After
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </section>


      <AnimatePresence>
        {galleryState.opened && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseMove={handleMouseMove}
          >
            <div className={`relative w-full h-full ${isFullscreen ? '' : 'max-w-6xl max-h-screen'} p-4`}>
       
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition"
                initial={{ y: -20, opacity: 0 }}
                animate={{ 
                  y: showControls ? 0 : -20,
                  opacity: showControls ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

          
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 text-white p-4 rounded-full hover:bg-black/80 transition"
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: showControls ? 0 : -20,
                  opacity: showControls ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/50 text-white p-4 rounded-full hover:bg-black/80 transition"
                initial={{ x: 20, opacity: 0 }}
                animate={{ 
                  x: showControls ? 0 : 20,
                  opacity: showControls ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              <div className="relative w-full h-full flex items-center justify-center">
                {galleryState.showComparison ? (
                  <div 
                    ref={containerRef}
                    className="relative w-full h-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl"
                  >
          
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={galleryState.activeImage.beforeSrc}
                        alt={`Before: ${galleryState.activeImage.title}`}
                        className="w-full h-full object-contain"
                      />
                      <motion.div 
                        className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                      >
                        Before
                      </motion.div>
                    </div>

          
                    <div 
                      className="absolute inset-0 h-full overflow-hidden"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={galleryState.activeImage.afterSrc}
                        alt={`After: ${galleryState.activeImage.title}`}
                        className="w-full h-full object-contain"
                      />
                      <motion.div 
                        className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                      >
                        After
                      </motion.div>
                    </div>

     
                    <motion.div 
                      className="absolute top-0 bottom-0 w-1.5 bg-white/90 cursor-ew-resize flex items-center justify-center z-10"
                      style={{ left: `calc(${sliderPosition}% - 3px)` }}
                      onMouseDown={startDragging}
                      onTouchStart={startDragging}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-4 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-2 h-8 bg-gray-400 rounded-full"></div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm shadow-lg backdrop-blur-sm"
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                    >
                      {Math.round(sliderPosition)}%
                    </motion.div>
                  </div>
                ) : (
                  <motion.div 
                    className="relative w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={galleryState.activeImage.afterSrc}
                      alt={galleryState.activeImage.title}
                      className="max-w-full max-h-full object-contain"
                    />
                    <motion.div 
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm"
                      initial="hidden"
                      animate="visible"
                      variants={fadeIn}
                    >
                      {galleryState.activeImage.title}
                    </motion.div>
                  </motion.div>
                )}
              </div>

          
              <motion.div 
                className="absolute bottom-6 left-0 right-0 flex justify-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: showControls ? 0 : 20,
                  opacity: showControls ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Comparison Toggle Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleComparison(); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition shadow-lg backdrop-blur-sm"
                >
                  {galleryState.showComparison ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>Single View</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <span>Compare Before/After</span>
                    </>
                  )}
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-full flex items-center gap-2 transition shadow-lg backdrop-blur-sm"
                >
                  {isFullscreen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 16L4 20v-4H2m18 0h2v4l-2-4m2-8l2-4h-2V4m-18 0h2v4l-2-4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
              </motion.div>

              {/* Image Counter */}
              <motion.div 
                className="absolute bottom-6 right-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm"
                initial="hidden"
                animate={{ 
                  y: showControls ? 0 : 20,
                  opacity: showControls ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                {galleryState.imageIndex + 1} of {project.images.length}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGalleryPage;