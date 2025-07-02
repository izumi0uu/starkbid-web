import React from 'react';
import Image from 'next/image';
import { OwnerItem } from '@/types/owners.types';

interface ItemThumbnailsProps {
  items: OwnerItem[];
  maxVisible: number;
  totalCount: number;
}

const ItemThumbnails: React.FC<ItemThumbnailsProps> = ({ 
  items, 
  maxVisible, 
  totalCount 
}) => {
  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = totalCount - maxVisible;

  return (
    <div className="flex gap-3">
      {visibleItems.map((item) => (
        <div
          key={item.id}
          className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="45px"
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-md  flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 text-[10px] font-medium">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default ItemThumbnails;