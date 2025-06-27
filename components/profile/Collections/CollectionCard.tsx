import React from 'react';
import Image from 'next/image';
import { CollectionItem } from './collection.types';

interface CollectionCardProps {
  collection: CollectionItem;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#2D2E32] bg-transparent shadow-lg p-3">
      {/* Collection Banner Image */}
      <div className="relative h-40 w-full">
        <Image
          src={collection.image}
          alt={`${collection.name} banner`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        {/* Collection Avatar */}
        <div className="absolute -bottom-8 left-4 h-16 w-16 rounded-full border-2 border-[#1C1D1F] bg-[#1C1D1F]">
          <Image
            src={collection.avatar}
            alt={`${collection.name} avatar`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-10"> 
      <div className="flex items-center">
  <h3 className="text-lg font-semibold text-white">{collection.name}</h3>
  {collection.isVerified && (
    <Image
      src="/verified.png"
      alt="Verified"
      width={16}
      height={16}
      className="ml-2"
    />
  )}
</div>


        <div className="m4-4 grid grid-cols-2 gap-2 text-sm bg-[#1C1D1F] p-4 rounded-lg">
          <div>
            <p className="text-[#8E9BAE] mb-2">Owners</p>
            <p className="font-medium text-white">{collection.owners}</p>
          </div>
          <div className="text-right">
            <p className="text-[#8E9BAE] mb-2">Total Volume</p>
            <p className="font-medium text-white">{collection.totalVolumeEth}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;