"use client";

import { useState, useEffect } from "react";
import { FC } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NextIcon, PrevIcon } from "../../public/icons/icons";

import { slides } from "@/data/data";

const Hero: FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
 

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
    <div
      className="text-white w-full flex items-center sm:pt-10 justify-center min-h-[80vh 2xl:min-h-[90vh px-4 sm:px-6 lg:px-8 max-w-full"
     
    >
      <div className="w-full max-w-[2000px] mx-auto">
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
            className="bg-[url('/images/noise.png')] bg-cover bg-center bg-no-repeat flex-1 xl:pt-24 xl:px-20 lg:pt-16 lg:px-16 md:px-12 md:pt-12 px-6 py-10 rounded-[18px]"
            role="region"
            aria-label="Image carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="lg:grid lg:grid-cols-2 grid-cols-1 xl:gap-16 lg:gap-10 gap-6 flex flex-col-reverse max-w-[2000px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[activeSlide].id}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="self-center lg:text-left text-center lg:max-w-none max-w-2xl mx-auto"
                  role="group"
                  aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}
                >
                  <p className="font-medium text-sm leading-6 text-white/60 xl:text-base">
                    COLLECTIONS
                  </p>
                  <h1 className="font-bold xl:text-[55px] 2xl:text-[65px] lg:text-[45px] md:text-[35px] text-[28px] leading-[1.2] mt-5">
                    {slides[activeSlide].title}
                  </h1>
                  <p className="font-semibold text-base xl:text-lg 2xl:text-xl mt-5 leading-relaxed xl:mt-8 max-w-xl">
                    {slides[activeSlide].description}
                  </p>

                  {/* bidding button */}
                  <motion.button
                    className="bg-[#FAFAFA] lg:py-4 lg:px-8 px-[14px] py-3 rounded-lg text-black mt-8 xl:mt-10 font-medium xl:text-lg"
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
                  className="flex items-center justify-center"
                  aria-label={`Slide ${activeSlide + 1} of ${slides.length}`}
                >
                  <div className="relative w-full aspect-[16/10] max-w-2xl mx-auto">
                    <Image
                      src={slides[activeSlide].image}
                      alt={slides[activeSlide].title}
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                      className="m-auto"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center mt-8 space-x-3">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded transition-all ${
                    index === activeSlide
                      ? "bg-white lg:w-[200px] xl:w-[250px] 2xl:w-[300px] w-[50px]"
                      : "bg-white/20 lg:w-16 xl:w-20 w-6"
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
