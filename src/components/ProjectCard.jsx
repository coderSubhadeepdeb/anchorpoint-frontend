import React, { useState } from "react";

const ProjectCard = ({ project = {}, onDelete, showDelete = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Safely get current image with fallbacks
  const images = project?.images || [];
  const currentImage = images[currentImageIndex];

  // Handle image navigation
  const nextImage = (e) => {
    e.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
      setImageLoading(true);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + images.length) % images.length
      );
      setImageLoading(true);
    }
  };

  // Handle image load and error
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Handle delete actions
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    if (onDelete && project._id) {
      onDelete(project._id);
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group cursor-pointer relative">
      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 p-4 rounded-xl">
          <div className="bg-white p-5 rounded-lg text-center max-w-xs">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="font-semibold text-gray-800 mb-2">Delete Project?</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete "{project.title}"? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete button (only shown if showDelete is true) */}
      {showDelete && !showDeleteConfirm && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-3 right-3 z-5 bg-white/90 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:scale-110 shadow-md focus:outline-none focus:ring-2 focus:ring-red-200"
          aria-label="Delete project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}

      {/* Image Section */}
      <div className="relative overflow-hidden aspect-video">
        {/* Image loading placeholder */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Main image - using 'src' instead of 'url' */}
        {currentImage && (
          <img
            src={currentImage.src}  
            alt={currentImage.title || project.title || "Project image"}
            className={`w-full h-full object-cover transition-all duration-500 ${imageLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Fallback for image error */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500 text-center">Image not available</p>
          </div>
        )}
        
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Image navigation arrows (only show if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image counter (only show if multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
        
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-white/90 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
            {project.category || "Uncategorized"}
          </span>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Project Title */}
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {project.title || "Untitled Project"}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {project.description || "No description available"}
        </p>

        {/* Date - using createdAt if date is not available */}
        {(project.date || project.createdAt) && (
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(project.date || project.createdAt).toLocaleDateString()}
          </div>
        )}

        {/* Image title and description (if available) */}
        {currentImage && (currentImage.title || currentImage.description) && (
          <div className="pt-3 border-t border-gray-100">
            {currentImage.title && (
              <p className="font-medium text-gray-800 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {currentImage.title}
              </p>
            )}
            {currentImage.description && (
              <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 pl-5">{currentImage.description}</p>
            )}
          </div>
        )}

       
      </div>
    </div>
  );
};

export default ProjectCard;