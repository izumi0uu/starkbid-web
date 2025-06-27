'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NFTGrid from './NFTGrid/NFTGrid';
import  CreatedFilters from './CreatedFilters/CreatedFilters'; 
import { CreatedFiltersState } from './CreatedFilters/CreatedFilters.types';
import { mockNFTs } from './lib/mockData'; 
import { NFT } from './NFTCard/NFTCard.types'; 

interface OwnedItemsProps {
  ownerAddress: string; 
  isOwner: boolean; 
}

const ITEMS_PER_PAGE = 8; 

const OwnedItems: React.FC<OwnedItemsProps> = ({ isOwner }) => {
  const [filters, setFilters] = useState<CreatedFiltersState>({
    searchTerm: '',
    sortBy: 'newest',
    priceRange: { min: null, max: null },
    collections: [],
    status: 'all',
    blockchain: 'all',
  });
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalOwnedCount, setTotalOwnedCount] = useState(0);

  const fetchOwnedNFTs = useCallback(async (
    currentFilters: CreatedFiltersState,
    currentPage: number
  ): Promise<{ nfts: NFT[]; totalCount: number }> => {

    const filteredNFTs = mockNFTs.filter(nft =>
      nft.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())
    );

    filteredNFTs.sort((a, b) => {
      if (currentFilters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (currentFilters.sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (currentFilters.sortBy === 'price_low') {
        return parseFloat(a.price.eth) - parseFloat(b.price.eth);
      }
      if (currentFilters.sortBy === 'price_high') {
        return parseFloat(b.price.eth) - parseFloat(a.price.eth);
      }
      return 0;
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedNFTs = filteredNFTs.slice(startIndex, endIndex);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          nfts: paginatedNFTs,
          totalCount: filteredNFTs.length,
        });
      }, 500);
    });
  }, []);

  const loadNFTs = useCallback(async (reset = false) => {
    setLoading(true);
    setError(null);
    const currentPage = reset ? 1 : page;

    try {
      const { nfts, totalCount } = await fetchOwnedNFTs(filters, currentPage);
      setOwnedNFTs(prevNfts => (reset ? nfts : [...prevNfts, ...nfts]));
      setTotalOwnedCount(totalCount);
      setHasMore(nfts.length === ITEMS_PER_PAGE);
      if (reset) setPage(1);
    } catch (err) {
      setError('Failed to load owned items.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, filters, fetchOwnedNFTs]);

  useEffect(() => {
    setPage(1);
    setOwnedNFTs([]); 
    loadNFTs(true);
  }, [filters, loadNFTs]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const emptyState = {
    title: 'No Owned Items Found',
    description: 'It seems there are no NFTs matching your criteria in this collection.',
  };

  return (
    <div>
      <CreatedFilters
        filters={filters}
        onFiltersChange={setFilters}
        totalCount={totalOwnedCount}
        isOwner={isOwner}
      />
      <NFTGrid
        items={ownedNFTs}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        emptyState={emptyState}
      />
    </div>
  );
};

export default OwnedItems;