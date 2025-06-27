'use client';

import React from 'react';
import NFTCard from '../NFTCard/NFTCard';
import { NFTGridProps } from './NFTGrid.types';

const NFTGrid: React.FC<NFTGridProps> = ({
  items,
  loading,
  error,
  hasMore,
  onLoadMore,
  emptyState,
}) => {
  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading items: {error}
      </div>
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-[#1C1D1F] rounded-lg animate-pulse h-80" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-white">{emptyState.title}</h3>
        <p className="text-[#8E9BAE] mt-2">{emptyState.description}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <NFTCard key={item.id} nft={item} />
      ))}

      {loading && (
        <div className="col-span-full flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500" />
        </div>
      )}

      {hasMore && !loading && (
        <div className="col-span-full flex justify-center py-4">
          <button
            onClick={onLoadMore}
            className="bg-[#1C1D1F] text-white px-4 py-2 rounded-lg hover:bg-[#2D2E32] transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NFTGrid;