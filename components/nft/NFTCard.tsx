"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { NFTCardProps } from "@/constants/data";

const NFTCard: React.FC<NFTCardProps> = ({
  title,
  creatorName,
  creatorIcon,
  isVerified,
  currentBid,
  likes,
  minted,
  timeLeft,
  image,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-80 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
    {/* Header */}
    <div className="flex justify-between items-center px-4 pt-4 pb-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
          {creatorIcon ? (
            <img
              src={creatorIcon}
              alt={creatorName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-white text-xs font-bold">👤</span>
          )}
        </div>
        <span className="text-white text-sm font-medium flex items-center gap-1">
          {creatorName}
          {isVerified && (
            <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
              <Check size={10} className="text-white" />
            </div>
          )}
        </span>
      </div>
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : ""} />
      </button>
    </div>

    {/* NFT Image */}
    <div className="px-4 pb-4">
      <div className="relative w-full h-64 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          // Default monkey character when no image is provided
          <div className="relative">
            {/* Head */}
            <div className="w-32 h-32 bg-green-400 rounded-full relative">
              {/* Hair */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-green-500 rounded-t-full"></div>
              <div className="absolute -top-2 left-4 w-4 h-6 bg-green-500 rounded-full"></div>
              <div className="absolute -top-2 right-4 w-4 h-6 bg-green-500 rounded-full"></div>
              
              {/* Eyes */}
              <div className="absolute top-8 left-6 w-8 h-8 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-6 h-6 bg-orange-300 rounded-full">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full">
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 right-6 w-8 h-8 bg-white rounded-full">
                <div className="absolute top-1 left-1 w-6 h-6 bg-orange-300 rounded-full">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full">
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Nose/Mouth area */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-orange-200 rounded-full">
                {/* Mouth */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-black rounded-b-full">
                  {/* Teeth */}
                  <div className="absolute top-0 left-2 w-1.5 h-2 bg-white"></div>
                  <div className="absolute top-0 left-4 w-1.5 h-2 bg-white"></div>
                  <div className="absolute top-0 right-2 w-1.5 h-2 bg-white"></div>
                </div>
              </div>
            </div>
            
            {/* Body */}
            <div className="w-24 h-20 bg-blue-500 rounded-t-2xl mx-auto -mt-2 relative">
              {/* Collar */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-green-600 rounded-t-2xl"></div>
              {/* Circle emblem */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Info Section */}
    <div className="px-4 pb-4">
      <h3 className="text-white font-bold text-lg mb-3">
        {title}
      </h3>
      <div className="flex justify-between items-center mb-1">
        <div className="text-gray-400 text-xs">Current Bid</div>
        <div className="text-gray-400 text-xs">{likes} likes</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-base">{currentBid} ETH</div>
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <span>{minted} minted</span>
          <span className="text-gray-600">|</span>
          <span>{timeLeft}</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default NFTCard;
