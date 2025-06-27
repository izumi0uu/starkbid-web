'use client';

import React, { useState } from 'react';
import CreatedFilters from '../CreatedFilters/CreatedFilters'; 
import ActivityTable from './ActivityTable'; 
import { CreatedFiltersState } from '../CreatedFilters/CreatedFilters.types';
import { ActivityItem } from './Activity.types'; 
import { mockNFTs } from '../lib/mockData'; 


interface ActivityTabProps {
  isOwner: boolean;
  userAddress: string; 
}

const generateMockActivityData = (nfts: typeof mockNFTs): ActivityItem[] => {
  const activity: ActivityItem[] = [];
  const transactionTypes = ['Sales', 'Transfer', 'Mint', 'Listing', 'Offers/Bids'];
  const usernames = ['Janice23', 'KelvinT', 'CryptoKing', 'NFT_Lover'];

  nfts.forEach((nft, index) => {
    const randomType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const fromUser = usernames[Math.floor(Math.random() * usernames.length)];
    const toUser = usernames[Math.floor(Math.random() * usernames.length)];
    const price = parseFloat(nft.price?.eth || '0.035'); 
    const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); 
    const timeAgoHours = Math.floor(Math.random() * 24) + 1;

    activity.push({
      id: `${nft.id}-${index}-activity`,
      itemName: nft.name,
      itemImage: nft.image,
      transactionType: randomType as ActivityItem['transactionType'],
      price: price,
      currency: 'WETH',
      collectionNumber: `#${Math.floor(Math.random() * 300) + 1}`, 
      qty: 1,
      from: fromUser,
      to: toUser,
      date: date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      timeAgo: `${timeAgoHours} hours ago`,
    });
  });
  return activity;
};


const ActivityTab: React.FC<ActivityTabProps> = ({ isOwner }) => {
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
    console.log('Activity Filters updated:', newFilters);
  };

  const activityData: ActivityItem[] = generateMockActivityData(mockNFTs);


  const filteredActivityData = activityData.filter(item =>
    item.itemName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    item.collectionNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    item.from.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    item.to.toLowerCase().includes(filters.searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (filters.sortBy === 'price_low') return a.price - b.price;
    if (filters.sortBy === 'price_high') return b.price - a.price;
    return 0;
  });


  return (
    <div className="py-4">
      <CreatedFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={activityData.length}
        isOwner={isOwner}
      />
      <ActivityTable data={filteredActivityData} />
    </div>
  );
};

export default ActivityTab;