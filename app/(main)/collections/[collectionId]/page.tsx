'use client'

import React, { useState, Suspense } from 'react'
import CollectionHeader from '@/components/collection-page/CollectionHeader'
import CollectionStats from '@/components/collection-page/CollectionStats'
import CollectionTabs from '@/components/collection-page/CollectionTabs'
import OwnersTab from '@/components/collection-page/owners/owners-tab'
import ActivityTab from '@/components/activity'
import { AboutTab } from '@/components/about-tab'
import { collectionMockNFTs } from '@/lib/mockData'
import NftViewer from '@/components/nft-explorer/nft-viewer'

type CollectionPageProps = {
  params: { collectionId: string }
}

const CollectionPage: React.FC<CollectionPageProps> = ({ params }) => {
  const [activeTab, setActiveTab] = useState('Items')
  const { collectionId } = params

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
      <CollectionHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CollectionStats />
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <CollectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  )
}

export default CollectionPage
