"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import Birds from "@/public/Birds.png";
import BitcoinPuppets from "@/public/BitcoinPuppets.png";
import CommanderDoug from "@/public/CommanderDoug.png";
import FlorianTUK from "@/public/FlorianTUK.png";
import Unchanted from "@/public/Unchanted.png";
import Uzumaki from "@/public/Uzumaki.png";
import { RightTailArrow } from "@/Icons";

const DRAG_BUFFER = 150;
const SCROLL_AMOUNT = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 150,
  damping: 80,
};

export const NFTLatestList = () => {
  const [nftIndex, setNftIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dragX = useMotionValue(0);


  useEffect(() => {
    const handleDrag = () => {
      const x = dragX.get();
      if (carouselRef.current) {
        if (x <= -DRAG_BUFFER) {
          carouselRef.current.scrollLeft += SCROLL_AMOUNT;
          dragX.set(0); // Reset drag value
        } else if (x >= DRAG_BUFFER) {
          carouselRef.current.scrollLeft -= SCROLL_AMOUNT;
          dragX.set(0); // Reset drag value
        }
      }
    };

    // Attach listener to dragX
    dragX.onChange(handleDrag);

    return () => {
      // Cleanup listener on unmount
      dragX.destroy();
    };
  }, [dragX]);

  useEffect(() => {
    if (carouselRef.current) {
      const { scrollWidth, offsetWidth } = carouselRef.current;
      if (scrollWidth <= offsetWidth) {
        carouselRef.current.scrollLeft = 0;
      }
    }
  }, [carouselRef.current]);

  return (
    <div className="pl-[16px] lg:pl-[80px]">
      <div className='flex items-center justify-between sm:mb-2 mb-0 mt-4 sm:mt-0'>
        <h4 className="text-white font-bold text-[18px] sm:text-[22px]">Latest NFT Drops</h4>
        <button
        aria-label="View All" 
        className="bg-[#1A1A1A] text-white rounded-[8px] cursor-pointer py-[8px] px-[14px] sm:py-[12px] sm:px-[20px] font-semibold flex items-center text-xs sm:text-sm sm:mr-12 mr-[16px] text-center">
          View All
          <RightTailArrow className='w-[11.67px] h-[11.67px] ml-2' />
        </button>
      </div>
      <div 
      role="group"
      aria-roledescription="carousel"
      aria-live="polite"
      aria-atomic="true"
      ref={carouselRef}
      className="relative overflow-hidden h-[325px] flex align-center">
        <motion.div
        drag="x"
        dragConstraints={{
        left: 0,
        right: 0,
        }}
        style={{
        x: dragX,
        }}
        transition={SPRING_OPTIONS}
        className="flex sm:gap-2 gap cursor-grab items-center active:cursor-grabbing"
        >
          <NFTs nftIndex={nftIndex} setNftIndex={setNftIndex} />
        </motion.div>

      </div>
    </div>
  );
};

const NFTs = ({ nftIndex, setNftIndex }: { nftIndex: number | null, setNftIndex: (value: number) => void }) => {
  return (
    <>
      {nftData.map((nft, idx) => {
        return (
          <motion.div
          role="option"
          aria-selected={nftIndex === idx}
          tabIndex={0}
          aria-label={`NFT ${idx + 1}: ${nft.title}`}
          key={idx}
          onClick={() => setNftIndex(idx)}
          transition={SPRING_OPTIONS}
          className="aspect-square w-[218px] shrink-0    transition-all duration-300 ease-linear border-transparent rounded-xl"
          >
            <div 
            className={`
              bg-[#1A1A1A] rounded-xl transition-all duration-500 hover:border-[#fff] hover:shadow-lg hover:border-2 hover:scale-105
              ${nftIndex === idx ? "scale-105 border-2 shadow-lg border-[#fff]" : "scale-95"}
            `}
            >
              <div className="aspect-square w-full">
                <Image
                width={210}
                height={215}
                src={nft.imageUrl}
                alt={nft.title}
                draggable="false"
                className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white text-sm font-semibold md:text-lg">{nft.title}</h3>
                <p className="text-white text-sm font-medium text-[12px]">{nft.category}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

const nftData = [
  {
    id: 1,
    imageUrl: Birds,
    title: 'Birds of Damascus',
    category: 'AUCTION'
  },
  {
    id: 2,
    imageUrl: BitcoinPuppets,
    title: 'Bitcoin Puppets',
    category: 'COLLECTIONS'
  },
  {
    id: 3,
    imageUrl: CommanderDoug,
    title: 'Commander Doug',
    category: 'LAUNCHPAD'
  },
  {
    id: 4,
    imageUrl: FlorianTUK,
    title: 'Florian TUK',
    category: 'HOT COLLECTION'
  },
  {
    id: 5,
    imageUrl: Unchanted,
    title: 'Unchanted',
    category: 'HOT COLLECTION'
  },
  {
    id: 6,
    imageUrl: Uzumaki,
    title: 'Uzumaki',
    category: 'HOT COLLECTION'
  },
];