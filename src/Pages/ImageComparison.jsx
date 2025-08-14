import { useState, useRef, useEffect } from 'react';

const ImageComparison = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 0), 100);
    
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => handleMove(e);
    const handleTouchMove = (e) => handleMove(e.touches[0]);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-lg shadow-lg"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
 
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={beforeImage} 
          alt="Before" 
          className="w-full h-full object-cover"
        />
      </div>

   
      <div 
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover"
        />
      </div>

    
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-3 h-10 bg-white rounded-full shadow-md"></div>
      </div>

    
      <div 
        className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm"
        style={{ left: `calc(${sliderPosition}% + 10px)` }}
      >
        {Math.round(sliderPosition)}%
      </div>
    </div>
  );
};

export default ImageComparison;