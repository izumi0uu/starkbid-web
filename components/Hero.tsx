"use client";

import { useState, useEffect } from "react"; 
import { FC } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NextIcon, PrevIcon } from "../public/icons/icons";

// each slide for the carousel animation
const slides = [
  {
    id: 1,
    title: "Rarity Spectrum",
    description:
      "A color-coded NFT project where each artwork’s rarity is determined by its unique hue combinations and metadata traits.",
    image: "/hero-image.png",
    bid: "0.125ETH",
  },
  {
    id: 2,
    title: "Unique Artworks",
    description:
      "Discover unique artworks with distinct metadata traits in our exclusive collection.",
    image: "/hero-image.png",
    bid: "0.15ETH",
  },
  {
    id: 3,
    title: "Unique Artworks",
    description:
      "Discover unique artworks with distinct metadata traits in our exclusive collection.",
    image: "/hero-image.png",
    bid: "0.15ETH",
  },
  {
    id: 4,
    title: "Unique Artworks",
    description:
      "Discover unique artworks with distinct metadata traits in our exclusive collection.",
    image: "/hero-image.png",
    bid: "0.15ETH",
  },
];

const Hero: FC = () => {
  // active slide index
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // handles next slide
  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // handles keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrev();
    }
  };

  // animated slide transitions
  useEffect(() => {
    if (isPaused) return; 

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval); 
  }, [activeSlide, isPaused]);

  const pauseAutoSlide = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 20000); 
  };


  // framer motion variants
  const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="text-white pt-4 flex items-center px-5 w-full">
      <div className="">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handlePrev();
              pauseAutoSlide();
            }}
            onKeyDown={handleKeyDown}
            aria-label="Previous slide"
            className="p-[14px] rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:block hidden"
          >
           <PrevIcon />
          </button>
          <div
            className="bg-[url('/noise.png')] bg-cover bg-center bg-no-repeat xl:pt-20 xl:px-20 lg:pt-10  lg:px-10 px-4 py-8 rounded-[18px]"
            role="region"
            aria-label="Image carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)} 
          >
            <div className="lg:grid lg:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-5 gap-3 flex flex-col-reverse">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[activeSlide].id}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="self-center lg:text-left text-center"
                  role="group"
                  aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}
                >
                  <p className="font-medium text-sm leading-6 text-white/60">
                    COLLECTIONS
                  </p>
                  <h1 className="font-bold xl:text-[45px] lg:text-[35px] text-[28px] leading-[63.9px] mt-5">
                    {slides[activeSlide].title}
                  </h1>
                  <p className="font-semibold text-base mt-5 leading-6">
                    {slides[activeSlide].description}
                  </p>

                  {/* bidding button */}
                  <motion.button
                    className="bg-[#FAFAFA] lg:py-3 lg:px-5 px-[14px] py-2 rounded-lg text-black mt-7"
                    whileHover={{ scale: 1.05 }}
                    aria-label={`Bid now for ${slides[activeSlide].bid}`}
                  >
                    Bid Now for {slides[activeSlide].bid}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[activeSlide].image}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  role="group"
                  aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}
                >
                  <Image
                    src={slides[activeSlide].image}
                    alt={slides[activeSlide].title}
                    width={619}
                    height={386}
                    priority
                    className="m-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-5 space-x-2">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded transition-all lg:mt-14 ${
                    index === activeSlide
                      ? "bg-white lg:w-[200px] w-[50px]"
                      : "bg-white/20 lg:w-14 w-5"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => {
                    setActiveSlide(index);
                    pauseAutoSlide();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveSlide(index);
                      pauseAutoSlide();
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              handleNext();
              pauseAutoSlide();
            }}
            onKeyDown={handleKeyDown}
            aria-label="Next slide"
            className="p-[14px] rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:block hidden"
          >
           <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;