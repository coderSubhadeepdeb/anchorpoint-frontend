"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; // Note: I corrected this from "motion/react" to "framer-motion"
import { cn } from "../utils";
import { ChevronLeft, ChevronRight } from "lucide-react"; // You'll need to install lucide-react or use another icon library

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
    setCurrentImageIndex(0); // Reset to first image when selecting a new card
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % selected.images.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + selected.images.length) % selected.images.length
    );
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && (
              <SelectedCard 
                selected={selected} 
                currentImageIndex={currentImageIndex}
                onNext={goToNextImage}
                onPrev={goToPrevImage}
              />
            )}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail} // Assuming you have a thumbnail for the grid view
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected, currentImageIndex, onNext, onPrev }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      
      {/* Image Slider */}
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.img
          key={currentImageIndex} // Important for animation
          src={selected.images[currentImageIndex]}
          className="object-contain max-h-full max-w-full z-20"
          alt="gallery image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/75"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/75"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {selected.images.length}
          </div>
        </div>
      </div>
      
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};