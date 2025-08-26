import { useState, useRef, useId, useEffect } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Slide = ({
    slide,
    index,
    current,
    handleSlideClick,
    totalSlides // Add this prop
}) => {
    const slideRef = useRef(null);

    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef();

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
    };

    const { src, button, title, status } = slide;

    return (
        <div className="[perspective:1200px] [transform-style:preserve-3d]">
            <li
                ref={slideRef}
                className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[60vmin] h-[60vmin] sm:w-[70vmin] sm:h-[70vmin] mx-[2vmin] sm:mx-[4vmin] z-10"
                onClick={() => handleSlideClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform:
                        current !== index
                            ? "scale(0.98) rotateX(8deg)"
                            : "scale(1) rotateX(0deg)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "bottom",
                }}>
                <div
                    className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
                    style={{
                        transform:
                            current === index
                                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                                : "none",
                    }}>
                    <img
                        className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                        style={{
                            opacity: current === index ? 1 : 0.5,
                        }}
                        alt={title}
                        src={src}
                        onLoad={imageLoaded}
                        loading="eager"
                        decoding="sync" />
                    {current === index && (
                        <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
                    )}
                </div>

                <article
                    className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}>
                    <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">
                        {title}
                    </h2>

                    {status && (
                        <p className="mt-2 text-sm text-neutral-300 font-medium">
                            Status: <span className="text-white">{status}</span>
                        </p>
                    )}

                    <div className="flex justify-center">
                        <button
                            className="mt-6 px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                            {button}
                            <Link to={`/images/68ab65f7e62ae68a639417aa`} className="absolute inset-0"></Link>

                        </button>
                    </div>
                </article>
            </li>
        </div>
    );
};

const CarouselControl = ({
    type,
    title,
    handleClick
}) => {
    return (
        <button
            className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""
                }`}
            title={title}
            onClick={handleClick}>
            <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
    );
};

export function Ongoing({
    slides
}) {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);
    const [slideWidth, setSlideWidth] = useState('70vmin');

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = Math.min(
                    containerRef.current.offsetWidth,
                    containerRef.current.offsetHeight
                );
                setSlideWidth(`${width * 0.9}px`);
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index) => {
        if (current !== index) {
            setCurrent(index);
        }
    };

    const id = useId();

    return (
        <motion.div 
            className="relative w-full max-w-[90vmin] h-[60vmin] sm:h-[70vmin] mx-auto"
            aria-labelledby={`carousel-heading-${id}`}
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <ul
                className="absolute flex h-full transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${current * (100 / slides.length)}%)`,
                }}>
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        slide={slide}
                        index={index}
                        current={current}
                        handleSlideClick={handleSlideClick}
                        totalSlides={slides.length} // Pass the total slides count
                    />
                ))}
            </ul>

            {/* Navigation controls at the bottom */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
                <CarouselControl
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />

                <div className="flex mx-4 gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSlideClick(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === current ? 'bg-white w-6' : 'bg-white/50'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <CarouselControl
                    type="next"
                    title="Go to next slide"
                    handleClick={handleNextClick}
                />
            </div>
        </motion.div>
    );
}
