"use client";
import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";

export default function MasonryImageGallery() {
  const [galleryState, setGalleryState] = useState({
    opened: false,
    activeUrl: null,
    imageIndex: null,
    photos: []
  });

  const galleryRef = useRef(null);

  // Sample images with different aspect ratios for better masonry effect
  const images = [
    { src: "https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg", aspect: "5/6" },
    { src: "https://images.pexels.com/photos/3618162/pexels-photo-3618162.jpeg", aspect: "3/4" },
    { src: "https://images.unsplash.com/photo-1689217634234-38efb49cb664", aspect: "4/5" },
    { src: "https://images.unsplash.com/photo-1520350094754-f0fdcac35c1c", aspect: "16/9" },
    { src: "https://cdn.devdojo.com/images/june2023/mountains-10.jpeg", aspect: "3/2" },
    { src: "https://cdn.devdojo.com/images/june2023/mountains-06.jpeg", aspect: "4/3" },
    { src: "https://images.pexels.com/photos/1891234/pexels-photo-1891234.jpeg", aspect: "2/3" },
    { src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383", aspect: "5/7" },
    { src: "https://images.pexels.com/photos/4256852/pexels-photo-4256852.jpeg", aspect: "3/5" },
    { src: "https://images.unsplash.com/photo-1541795083-1b160cf4f3d7", aspect: "4/7" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", aspect: "5/8" },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", aspect: "8/5" }
  ];

  useEffect(() => {
    // Initialize photos data with index
    const photos = images.map((img, index) => ({
      ...img,
      index: index + 1
    }));
    setGalleryState(prev => ({ ...prev, photos }));

    // Add keyboard event listeners
    const handleKeyDown = (e) => {
      if (galleryState.opened) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Escape') handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryState.opened]);

  const handleOpen = (e, index) => {
    setGalleryState({
      opened: true,
      activeUrl: e.currentTarget.src,
      imageIndex: index,
      photos: galleryState.photos
    });
  };

  const handleClose = () => {
    setGalleryState(prev => ({ ...prev, opened: false }));
    setTimeout(() => {
      setGalleryState(prev => ({ ...prev, activeUrl: null }));
    }, 300);
  };

  const handleNext = () => {
    let newIndex;
    if (galleryState.imageIndex === galleryState.photos.length) {
      newIndex = 1;
    } else {
      newIndex = galleryState.imageIndex + 1;
    }
    
    const newUrl = galleryState.photos.find(p => p.index === newIndex)?.src;
    setGalleryState(prev => ({
      ...prev,
      imageIndex: newIndex,
      activeUrl: newUrl
    }));
  };

  const handlePrev = () => {
    let newIndex;
    if (galleryState.imageIndex === 1) {
      newIndex = galleryState.photos.length;
    } else {
      newIndex = galleryState.imageIndex - 1;
    }
    
    const newUrl = galleryState.photos.find(p => p.index === newIndex)?.src;
    setGalleryState(prev => ({
      ...prev,
      imageIndex: newIndex,
      activeUrl: newUrl
    }));
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="w-full h-full select-none p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
        ref={galleryRef}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className="mb-4 transition-all duration-300 hover:opacity-90"
            style={{ aspectRatio: img.aspect }}
          >
            <img
              onClick={(e) => handleOpen(e, index + 1)}
              src={img.src}
              className="object-cover w-full h-full rounded-lg cursor-zoom-in bg-gray-200"
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
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
              <svg className="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <img
              className="object-contain object-center w-full h-full select-none cursor-zoom-out"
              src={galleryState.activeUrl}
              alt=""
              style={{ animation: 'zoomIn 0.3s ease-in-out' }}
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-0 flex items-center justify-center text-white -translate-x-4 md:-translate-x-10 rounded-full cursor-pointer bg-white/10 w-10 h-10 md:w-14 md:h-14 hover:bg-white/20 z-50"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50">
              <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {galleryState.imageIndex} / {galleryState.photos.length}
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
      `}</style>
    </div>
  );
}