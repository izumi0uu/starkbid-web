'use client'

import type React from 'react'
import { useState } from 'react'
import CollectionHeader from '@/components/collection-page/CollectionHeader'
import CollectionStats from '@/components/collection-page/CollectionStats'
import CollectionTabs from '@/components/collection-page/CollectionTabs'
import OwnersTab from '@/components/collection-page/owners/owners-tab'
import ActivityTab from '@/components/activity'
import Footer from '@/components/landing-page/Footer'
import Navbar from '@/components/landing-page/Navbar'
import { AboutTab } from '@/components/about-tab'
import { collectionMockNFTs } from '@/lib/mockData'
import NftViewer from '@/components/nft-explorer/nft-viewer'
import { Suspense } from 'react';

function CollectionPage() {
  const [activeTab, setActiveTab] = useState('Items')

  const collectionId = 'mock-collection-id'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Items':
        return (
          <Suspense fallback={<div>Loading NFTs...</div>}>
            <NftViewer mockNFTs={collectionMockNFTs} />
          </Suspense>
        )
      case 'About':
        return <AboutTab />
      case 'Activity':
        return (
          <div className="py-6">
            <ActivityTab collectionId={collectionId} isActive={true} />
          </div>
        )
      case 'Owner':
        return <OwnersTab collectionId={collectionId} />
      default:
        return (
          <Suspense fallback={<div>Loading NFTs...</div>}>
            <NftViewer mockNFTs={collectionMockNFTs} />
          </Suspense>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Navbar />
      <CollectionHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CollectionStats />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <CollectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
      <Footer />
    </div>
  )
}

export default CollectionPage
