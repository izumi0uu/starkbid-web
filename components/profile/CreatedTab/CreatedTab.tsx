'use client';

import React, { useState } from 'react';
import NFTGrid from '../NFTGrid/NFTGrid';
import CreatedFilters from '../CreatedFilters/CreatedFilters';
import { CreatedFiltersState } from '../CreatedFilters/CreatedFilters.types'; 
import type { NFT } from '../NFTCard/NFTCard.types';

interface CreatedTabProps {
  userAddress: string;
  isOwner: boolean;
}

const CreatedTab: React.FC<CreatedTabProps> = ({ userAddress, isOwner }) => {
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
    
  // Mock data with explicit typing to match NFT
  const mockItems: NFT[] = Array(8).fill(0).map((_, i) => ({
    id: `nft-${i}`,
    tokenId: `${i + 1}`,
    name: `NFT ${i + 1}`,
    image: '/nft.png',
    price: { 
      eth: (0.01 * (i + 1)).toFixed(3), 
      usd: (30 * (i + 1)).toFixed(2) 
    },
    collection: { 
      id: `collection-${i % 3 + 1}`,
      name: `Collection ${i % 3 + 1}`,
      slug: `collection-${i % 3 + 1}`,
      image: '/placeholder-collection.png'
    },
    creator: { 
      address: userAddress,
      username: undefined,
      avatar: undefined
    },
    stats: { 
      viewCount: 100 + i * 20, 
      likeCount: 10 + i * 2, 
      shareCount: 5 + i 
    },
    lastSale: i % 2 === 0 ? { 
      price: (0.02 * (i + 1)).toFixed(3),
      date: new Date(),
      buyer: '0x0000000000000000000000000000000000000000'
    } : undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: (['active', 'sold', 'active'] as const)[i % 3],
    blockchain: 'ethereum',
    owner: {
      address: userAddress,
      username: undefined,
      avatar: undefined
    },
    likes: 10 + i,
    views: 100 + i * 20,
    isLiked: false,
    auction: undefined,
    offers: []
  }));

  return (
    <div className="mt-6">
      <CreatedFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalCount={mockItems.length}
        isOwner={isOwner}
      />
      
      <NFTGrid
        items={mockItems}
        loading={false}
        error={null}
        hasMore={false}
        onLoadMore={() => {}}
        emptyState={{
          title: "No Created Items",
          description: isOwner 
            ? "You haven't created any items yet. Start creating your first NFT!" 
            : "This user hasn't created any items yet."
        }}
      />
    </div>
  );
};

export default CreatedTab;