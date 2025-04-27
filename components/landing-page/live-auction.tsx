"use client";

import React from "react";
import Image from "next/image";

const LiveAuction = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row gap-16 px-4">
        
        <div className="flex-1 flex flex-col justify-start gap-10">
    
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold leading-tight text-green-400">
            <span className="text-green">● </span> Live Auctions</h2>
            <p className="text-lg text-gray-300 max-w-md">
              Participate in real-time bidding wars on the most sought-after NFTs.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-2 border-l-4 border-green pl-6">
              <h3 className="text-2xl font-semibold">Exclusive Artworks</h3>
              <p className="text-gray-400 text-base">
                Own rare and limited-edition digital masterpieces.
              </p>
              <button className="w-fit mt-2 text-green-400 hover:underline">
                See More →
              </button>
            </div>

            {/* Music NFTs */}
            <div className="pl-6">
              <h3 className="text-2xl font-semibold text-gray-500">
                Music & Lyrics NFTs
              </h3>
            </div>

            {/* Gaming NFTs */}
            <div className="pl-6">
              <h3 className="text-2xl font-semibold text-gray-500">
                Gaming Collectibles
              </h3>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col">
          
          {/* NFT Card */}
          <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-2xl w-[683px]">
            
            {/* NFT Image */}
            <Image
              src="/live-auction.png" 
              alt="NFT Artwork"
              width={683}
              height={591}
              className=" object-cover"
              priority
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-4">

              {/* Top Info */}
              <div className="flex justify-between items-start">
                
              

               
              </div>

            {/* Bottom Info */}
<div className="flex flex-col gap-4">

{/* User Info and Live Bid together */}
<div className="flex justify-between items-center">

  {/* User Info */}
  <div className="flex items-center gap-2">
    <Image
      src="/avatar.png"
      alt="User Avatar"
      width={24}
      height={24}
      className="rounded-full"
    />
    <span className="text-base">By <strong>Jacksonito</strong></span>
    <Image
      src="/tick.png"
      alt="User Avatar"
      width={24}
      height={24}
      className="rounded-full"
    />
  </div>

  {/* Live Bid and Price */}
  <div className="flex flex-col items-end">
    <div className=" px-3 py-1 rounded-full text-base mb-1">
    <span className="text-green">● </span>Live Bid
    </div>
    <h2 className="text-white font-bold text-xl">0.956 ETH</h2>
  </div>

</div>

{/* Timer */}
<div className="flex flex-wrap gap-4   p-3 rounded-lg w-fit">
  {[
    { label: "days", value: "2" },
    { label: "hrs", value: "20" },
    { label: "mins", value: "10" },
    { label: "secs", value: "18" },
  ].map((item, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center justify-center bg-light_grey p-4 rounded-md min-w-[60px]"
    >
      <span className="text-xl font-bold">{item.value}</span>
      <span className="text-[10px] uppercase">{item.label}</span>
    </div>
  ))}
</div>


{/* Title and Place Bid Button together */}
<div className="flex justify-between items-center p-4 rounded-lg">

  {/* Title and Description */}
  <div>
    <h1 className="text-xl font-bold mb-1">Muittude #Facetag</h1>
    <p className="text-gray-300 text-base">
      This information would contain a short description of the displayed NFT.
    </p>
  </div>

  {/* Place Bid Button */}
  <button className="bg-purple hover:bg-purple w-[165px] h-[50px] text-white text-sm font-semibold rounded-lg">
    Place a Bid
  </button>

</div>

</div>


            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LiveAuction;
