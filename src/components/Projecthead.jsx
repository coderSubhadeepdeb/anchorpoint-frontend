import React, { useState, useEffect } from 'react';

const Projecthead = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  const desktopImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80";
  const mobileImage = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
  
  return (
    <div
      className="relative overflow-hidden bg-cover bg-no-repeat py-8 md:py-12 text-center bg-center"
      style={{ 
        backgroundImage: `url('${isMobile ? mobileImage : desktopImage}')`, 
        height: isMobile ? "250px" : "450px",
        backgroundPosition: isMobile ? "center 30%" : "center center"
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="flex h-full items-center justify-center px-4">
          <div className="text-white max-w-4xl mx-auto">
            <h2 className="mb-2 md:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Projects
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              Explore our portfolio of innovative architectural designs and construction projects
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projecthead;