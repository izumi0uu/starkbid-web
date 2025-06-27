'use client';

import React, { useState } from 'react';
import CreatedFilters from '../CreatedFilters/CreatedFilters';
import { CreatedFiltersState } from '../CreatedFilters/CreatedFilters.types';
import CollectionCard from './CollectionCard';
import { CollectionItem } from './collection.types';

interface CollectionsTabProps {
    isOwner: boolean;
    userAddress: string;
}

const mockCollections: CollectionItem[] = [
    {
        id: '1',
        name: 'Cyber Vision',
        image: '/nft.png',
        avatar: '/nft2.png',
        isVerified: true,
        owners: 35,
        totalVolumeEth: '0.287 ETH',
        price: 0.1
    },
    {
        id: '2',
        name: 'MonkeyMan (もりうさ)',
        image: '/nft.png',
        avatar: '/nft2.png',
        isVerified: true,
        owners: 125,
        totalVolumeEth: '112.2 ETH',
        price: 0.1
    },
    {
        id: '3',
        name: 'Ocean Wavers',
        image: '/nft.png',
        avatar: '/nft2.png',
        isVerified: true,
        owners: 90,
        totalVolumeEth: '0.287 ETH',
        price: 0.1

    },
    {
        id: '4',
        name: 'Killian Avengers',
        image: '/nft.png',
        avatar: '/nft2.png',
        isVerified: true,
        owners: 305,
        totalVolumeEth: '0.287 ETH',
        price: 0.1
    },
];

const CollectionsTab: React.FC<CollectionsTabProps> = ({ isOwner }) => {
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

    const filteredCollections = mockCollections.filter(collection =>
        collection.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (filters.sortBy === 'price_low') return a.price - b.price;
        if (filters.sortBy === 'price_high') return b.price - a.price;
        return 0;
    });


    return (
        <div className="py-4">
            {/* Filters for Collections - using CreatedFilters */}
            <CreatedFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                totalCount={filteredCollections.length}
                isOwner={isOwner}
            />
            <div className="mb-4">
                <label className="text-sm text-[#8E9BAE] mr-2" htmlFor="sortBy">Created:</label>
                <select
                    id="sortBy"
                    value={filters.sortBy}
                    onChange={(e) => handleFiltersChange({ ...filters, sortBy: e.target.value as CreatedFiltersState['sortBy'] })}
                    className="bg-[#1C1D1F] border border-[#2D2E32] text-sm text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="most_viewed">Most Viewed</option>
                </select>
            </div>



            {/* Collections Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {filteredCollections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
                {filteredCollections.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">No collections found.</p>
                )}
            </div>
        </div>
    );
};

export default CollectionsTab;