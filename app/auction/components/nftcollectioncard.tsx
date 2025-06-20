import React from 'react';
import Image, { StaticImageData } from 'next/image';
import verified_icon from '../../../public/verified.png'

interface NFTCardData {
  id: number;
  title: string;
  creator: string;
  creatorAvatar: string;
  isVerified: boolean;
  currentBid: string;
  bidCount: number;
  timeLeft: string;
  image: StaticImageData;
  likes: number;
}

interface NFTCollectionCardProps {
  data: NFTCardData;
}

const NFTCollectionCard: React.FC<NFTCollectionCardProps> = ({ data }) => {
  return (
    <div className="border border-darkerGray rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 p-3 my-2">
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2 pb-3'>
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={data.creatorAvatar}
              alt={data.creator}
              width={24}
              height={24}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-400">{data.creator}</span>
          {data.isVerified && (
            <Image src={verified_icon} alt='verified_icon' width={20} height={20} />
          )}
        </div>
        {/* Like button overlay */}
        <div className="flex w-fit bg-black/50 rounded-full p-2 backdrop-blur-sm">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-xs text-white ml-1">{data.likes}</span>
        </div>
      </div>


      {/* NFT Image */}
      <div className="relative h-[350px] overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* NFT Title */}
        <h3 className="text-white font-semibold text-lg mb-2 truncate">{data.title}</h3>

        {/* Bid Info */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-gray-400 text-xs">Current Bid</p>
            <p className="text-white font-semibold">{data.currentBid}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">{data.bidCount} bids</p>
            <p className="text-gray-400 text-xs">{data.timeLeft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCollectionCard;
