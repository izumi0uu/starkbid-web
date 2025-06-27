'use client';

import React, { useState } from 'react';
import CreatedFilters from './CreatedFilters/CreatedFilters'; 
import { CreatedFiltersState } from './CreatedFilters/CreatedFilters.types';
import Image from 'next/image';

interface OffersBidsTabProps {
  isOwner: boolean;
  userAddress: string;
}

const OffersBidsTab: React.FC<OffersBidsTabProps> = ({ isOwner }) => {
const [filters, setFilters] = useState<CreatedFiltersState>({
        searchTerm: '',
        sortBy: 'newest',
        priceRange: { min: null, max: null },
        collections: [],
        status: 'all',
        blockchain: 'all',
        marketplaces: {
          marketPlace: false,
          search: false,
          startBid: false,
          openSea: false,
          sudoSwap: false,
          rarible: false
        },
        collectionSort: 'default',
        traits: {}
    });
    

  const handleFiltersChange = (newFilters: CreatedFiltersState) => {
    setFilters(newFilters);
    console.log('Offers/Bids Filters updated:', newFilters);
  };

  const hasOffersOrBids = false; 

  return (
    <div className="py-4">
      {/* Filters */}
      <CreatedFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={0}
        isOwner={isOwner}
      />

      {/* Content based on whether offers/bids exist */}
      {!hasOffersOrBids ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <Image
            src="/frame.png" 
            alt="No Bids & Offers Found"
            width={150} 
            height={150} 
            priority 
          />
          <h3 className="mt-8 text-xl font-semibold text-white">
            No Bids & Offers found
          </h3>
          <p className="mt-2 text-[#8E9BAE]">
            We couldn&apos;t find anything for this section.
          </p>
        </div>
      ) : (
        <div className="mt-4 text-white">
          <p>Offers/Bids content would be displayed here...</p>
        </div>
      )}
    </div>
  );
};

export default OffersBidsTab;