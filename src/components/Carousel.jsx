import { useEffect, useState } from 'react';

const Carousel = () => {

    const slides = [
    {
      imgSrc: 'https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg',
      imgAlt: 'Vibrant abstract painting with swirling blue and light pink hues.',
    },
    {
      imgSrc: 'https://officebanao.com/wp-content/uploads/2024/05/Copy-of-Copy-of-Image-3.jpg',
      imgAlt: 'Vibrant abstract painting with swirling red, yellow, and pink hues.',
    },
    {
      imgSrc: 'https://penguinui.s3.amazonaws.com/component-assets/carousel/default-slide-3.webp',
      imgAlt: 'Vibrant abstract painting with swirling blue and purple hues.',
    },
  ];

    const [currentIndex, setCurrentIndex] = useState(0); 
    const [isTransitioning, setIsTransitioning] = useState(false); 

    const next = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); 
            setIsTransitioning(false);
        }, 700); 
    };

    const previous = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length); // Modulus for infinite looping
            setIsTransitioning(false);
        }, 700);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000); 
        return () => clearInterval(interval);
    }, [currentIndex]);

  return (
    <div className="relative w-full mx-auto  overflow-hidden pt-16 ">
    
      <button
        onClick={previous}
        className="absolute left-5 top-1/2 z-20 flex h-10 w-10 items-center justify-center -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-md text-black hover:bg-white/50 transition"
      >
        {/* left arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3" className="size-5 md:size-6 pr-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      
      <button
        onClick={next}
        className="absolute right-5 top-1/2 z-20 flex h-10 w-10 items-center justify-center -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-md text-black hover:bg-white/50 transition"
      >
      
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="3" className="size-5 md:size-6 pl-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="relative min-h-[56svh] max-h-[65svh]  w-full overflow-hidden">
        <div className="absolute w-full h-full transition-opacity ease-in-out duration-700">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex-shrink-0 transition-opacity duration-700 ${
                currentIndex === index
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
            >
              <img
                src={slide.imgSrc}
                alt={slide.imgAlt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

  
      <div className="absolute bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:gap-3 bg-surface/75 px-1.5 py-1 md:px-2 rounded-radius dark:bg-surface-dark/75">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`size-2 rounded-full transition ${
              index === currentIndex
                ? 'bg-on-surface dark:bg-on-surface-dark'
                : 'bg-on-surface/50 dark:bg-on-surface-dark/50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
