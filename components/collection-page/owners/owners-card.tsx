import React from 'react';
import Image from 'next/image';
import ItemThumbnails from './item-thumbnails';
import { formatAddress } from '@/utils/formatter/address.utils';
import { Owner } from '@/types/owners.types';

interface OwnerCardProps {
  owner: Owner;
  onClick?: (owner: Owner) => void;
}

const OwnerCard: React.FC<OwnerCardProps> = ({ owner, onClick }) => {
  return (
    <div 
      className="bg-[#101213] border-[2px] border-[#292929] rounded-2xl p-6 flex flex-col gap-6 hover:bg-[#131516] transition-all duration-200 cursor-pointer relative"
      onClick={() => onClick?.(owner)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image 
              src={owner.avatar} 
              alt={`${owner.username} avatar`}
              width={64}
              height={64}
              className="rounded-full w-16 h-16"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-xl mb-1">{owner.username}</h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm font-mono">
                {formatAddress(owner.address)}
              </span>
            </div>
          </div>
        </div>
        {owner.isCreator && (
          <div className="bg-gray-600 text-white text-sm px-3 py-1 rounded-lg font-medium">
            Creator
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 py-4 bg-[#1C1D1F] rounded-lg">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Owned</p>
          <p className="text-white font-bold lg:text-3xl text-2xl">{owner.itemsOwned}</p>
        </div>
        <div className="text-center border-l border-r border-gray-600 border-dashed">
          <p className="text-gray-400 text-sm mb-2">% Owned</p>
          <p className="text-white font-bold text-2xl lg:text-3xl">{owner.ownershipPercentage}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-[12px] mb-2">EST. Value</p>
          <p className="text-white font-bold text-xl">
            {owner.estimatedValue.amount} {owner.estimatedValue.currency}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-white text-lg font-medium mb-4">Items</p>
        <ItemThumbnails
          items={owner.items}
          maxVisible={5}
          totalCount={owner.itemsOwned}
        />
      </div>
    </div>
  );
};

export default OwnerCard;