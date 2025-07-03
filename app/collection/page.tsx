"use client";
import React, { useState } from 'react';
import CollectionHeader from '@/components/collection-page/CollectionHeader';
import CollectionStats from '@/components/collection-page/CollectionStats';
import CollectionTabs from '@/components/collection-page/CollectionTabs';
import FilterBar from '@/components/collection-page/FilterBar/FilterBar';
import NFTGrid from '@/components/collection-page/NFTGrid';
import OwnersTab from '@/components/collection-page/owners/owners-tab';
import Footer from '@/components/landing-page/Footer';
import Navbar from '@/components/landing-page/Navbar';
import { AboutTab } from '@/components/about-tab';

const CollectionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Recently Listed');
  const collectionId = "mock-collection-id";

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Items':
        return (
          <>
            <FilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <NFTGrid />
          </>
        );
      case 'About':
        return <AboutTab />;
      case 'Activity':
        return (
          <div className="py-8">
            <div className="bg-[#181A1B] rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Recent Activity</h3>
              <p className="text-gray-300">
                This is a placeholder for the Activity section. Add transaction history,
                sales, transfers, and other activities here.
              </p>
            </div>
          </div>
        );
      case 'Owner':
        return <OwnersTab collectionId={collectionId} />;
      default:
        return (
          <>
            <FilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <NFTGrid />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Navbar />
      <CollectionHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CollectionStats />
      </div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-28">
        <CollectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;