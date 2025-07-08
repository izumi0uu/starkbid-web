'use client'

import type React from 'react'
import { useState } from 'react'
import CollectionHeader from '@/components/collection-page/CollectionHeader'
import CollectionStats from '@/components/collection-page/CollectionStats'
import CollectionTabs from '@/components/collection-page/CollectionTabs'
import FilterBar from '@/components/collection-page/FilterBar/FilterBar'
import NFTGrid from '@/components/collection-page/NFTGrid'
import OwnersTab from '@/components/collection-page/owners/owners-tab'
import ActivityTab from '@/components/activity'
import Footer from '@/components/landing-page/Footer'
import Navbar from '@/components/landing-page/Navbar'
import { AboutTab } from '@/components/about-tab'
import { collectionMockNFTs } from '@/components/profile/lib/mockData'
import NftViewer from '@/components/nft-explorer/nft-viewer'

function CollectionPage() {
  const [activeTab, setActiveTab] = useState('Items')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Recently Listed')

  const collectionId = 'mock-collection-id'

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Items':
        return (
          <>
            <NftViewer mockNFTs={collectionMockNFTs} />
          </>
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
          <>
            <NftViewer mockNFTs={collectionMockNFTs} />
          </>
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
