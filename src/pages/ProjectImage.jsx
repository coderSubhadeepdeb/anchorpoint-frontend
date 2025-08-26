import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Masonry from "react-masonry-css";
import axios from "axios";
import { useParams } from "react-router-dom";

const api = axios.create({
  baseURL: "https://anchorpoint-api.onrender.com",
  withCredentials: true,
});

const ProjectGalleryPage = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [project, setProject] = useState(null);
  const { projectId } = useParams();


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/api/v1/projects/${projectId}`); 
        if (response.data.success) {
          setProject(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]); 

 
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", () => video.play());

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };


  useEffect(() => {
    if (isSliderOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSliderOpen]);

  const openSlider = (index) => {
    setCurrentIndex(index);
    setIsSliderOpen(true);
  };

  const closeSlider = () => setIsSliderOpen(false);

  const showNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % imageMedia.length);
  };

  const showPreviousSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + imageMedia.length) % imageMedia.length);
  };

  // Swipe support
  const swipeHandlers = useSwipeable({
    onSwipedLeft: showNextSlide,
    onSwipedRight: showPreviousSlide,
    trackMouse: true,
  });

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSliderOpen) return;
      if (e.key === "ArrowRight") showNextSlide();
      if (e.key === "ArrowLeft") showPreviousSlide();
      if (e.key === "Escape") closeSlider();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSliderOpen]);

  const breakpointCols = {
    default: 3,
    1024: 2,
    640: 1,
  };

  if (!project) return <div className="text-center py-20">Loading...</div>;

 
  const videoMedia = project.videoLink || null;
  const imageMedia = project.images || [];

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {videoMedia ? (
          <video
            ref={videoRef}
            src={videoMedia} 
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">{project.description}</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              {project.description}
            </motion.p>
          </div>
        </div>

       
        {videoMedia && (
          <button
            onClick={toggleVideoPlayback}
            className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Project Gallery</h2>
        {imageMedia.length > 0 ? (
          <Masonry
            breakpointCols={breakpointCols}
            className="flex w-auto -ml-4"
            columnClassName="pl-4"
          >
            {imageMedia.map((img, index) => (
              <motion.div
                key={img._id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-4 relative group cursor-pointer"
                onClick={() => openSlider(index)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <h3 className="text-white text-lg font-semibold">{img.title}</h3>
                    <p className="text-white text-sm">{img.description}</p>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No images available for this project.</p>
          </div>
        )}
      </section>

   
      <AnimatePresence>
        {isSliderOpen && (     
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeSlider}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="relative w-full max-w-6xl max-h-[90vh]"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                {...swipeHandlers}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeSlider}
                  className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm transition"
                  aria-label="Close gallery"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative w-full h-full overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imageMedia[currentIndex]._id} // Fixed: Changed id to _id
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={imageMedia[currentIndex].src}
                        alt={imageMedia[currentIndex].title}
                        className="max-w-full max-h-[70vh] object-contain rounded-lg"
                      />
                      <div className="mt-6 text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-white">
                          {imageMedia[currentIndex].title}
                        </h2>
                        <p className="text-gray-300 mt-2">
                          {imageMedia[currentIndex].description}
                        </p>
                        {/* Removed tags since they don't exist in your API response */}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPreviousSlide();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-sm transition"
                  aria-label="Next image"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
                  {currentIndex + 1} / {imageMedia.length}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGalleryPage;