"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/create-nfts/common/BackButton";
import Image from "next/image";
import LazyBoysAvatar from "@/public/avatars/lazy-boys.svg";
import IceFletcherAvatar from "@/public/avatars/ice.png";
import UtopiaDreamsAvatar from "@/public/avatars/utopia.png";

export default function AddToCollection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const collections = [
    { value: "lazy-boys", label: "Lazy Boys Don't Lie", avatar: LazyBoysAvatar, items: "5,000 items" },
    { value: "ice-fletcher", label: "Ice Fletcher", avatar: IceFletcherAvatar, items: "5,000 items" },
    { value: "utopia-dreams", label: "Utopia Dreams", avatar: UtopiaDreamsAvatar, items: "5,000 items" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (collection) => {
    setSelectedCollection(collection);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-bold mt-4">Add To Collection</h1>
        <p className="text-gray-400 mt-2">
          Please select the collection you want to add this NFT to or just create a new one.
        </p>
              <div className="flex items-center gap-4 mb-6 bg-gray-400/10 px-4 py-5 bg-deepGray rounded-md">
                <div className=" rounded-full bg-purple overflow-hidden">
                  <Image
                    src="/avatars/create-nft-pfp.png"
                    alt="User avatar"
                    width={60}
                    height={60}
                    className=" object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="xl:text-base font-bold text-white text-sm">
                      @radicaldude84
                    </p>
                  </div>
                  <p className="xl:text-base text-sm  font-semibold text-white">
                    352by_fc76
                  </p>
                </div>
                <div className="ml-auto text-start">
                  <span className=" text-xs bg-green text-black px-2 py-0.5 rounded-full">
                    Connected
                  </span>
                  <p className="text-sm text-gray-400">Ethereum Blockchain</p>
                </div>
              </div>


        <div className="mt-6 relative">
          <div 
            className="flex items-center justify-between bg-black border border-darkerGray rounded-md py-3 px-4 cursor-pointer"
            onClick={toggleDropdown}
          >
            {selectedCollection ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image 
                    src={selectedCollection.avatar}
                    alt={selectedCollection.label}
                    width={24}
                    height={24}
                  />
                </div>
                <span>{selectedCollection.label}</span>
                <span className="ml-auto text-gray-400">{selectedCollection.items}</span>
              </div>
            ) : (
              <span className="text-gray-400">Select...</span>
            )}
            <svg className={`h-4 w-4 text-gray-400 transition duration-300 ${isOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full bg-black border border-darkerGray rounded-md mt-2 py-2"
            >
              {collections.map((collection) => (
                <div
                  key={collection.value}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-10"
                  onClick={() => handleOptionClick(collection)}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image 
                      src={collection.avatar}
                      alt={collection.label}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span>{collection.label}</span>
                  <span className="ml-auto text-gray-400">{collection.items}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Rest of the component */}
      </div>
    </div>
  );
}