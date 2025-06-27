'use client';

import React, { useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import OwnedItems from '@/components/profile/OwnedItems';
import CreatedTab from '@/components/profile/CreatedTab/CreatedTab';
import ActivityTab from '@/components/profile/Activity/ActivityTab';
import CollectionsTab from '@/components/profile/Collections/CollectionsTab';
import OffersBidsTab from '@/components/profile/OffersBidsTab';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'owned items' | 'created' | 'activity' | 'collections' | 'offers/bids'>('owned items');

  const userProfile = {
    address: '0x9d863ed03...3ba8',
    username: 'Cattie Negtar',
    avatarUrl: '/profileimage.png',
    verified: true,
    bio: 'This would contain a short bio about Cattie Negtar. Carvings that tell the stories of ancestors long past. Every ancient story from. The peace, blackened horned knight is an embodiment of peace, unity and strength. Striking look of intricate carvings that tell the stories of ancestors long past. Every ancient story from. A brand for the metaverse. Built by the community.',
    stats: {
      totalValueEth: '0.30',
      totalValueUsd: '750.44',
      ownedCount: 25,
      createdCount: 0,
      collectionsCount: 4,
    },
    social: {
      twitter: '#',
      instagram: '#',
      discord: '#',
      website: '#',
    },
    dateJoined: 'May 15, 2025',
  };

  const isOwner = true; 

  return (
    <div className="bg-[#101213] min-h-screen">
        <ProfileHeader profile={userProfile} />
      <div className="mx-auto px-8 py-8">
        
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === 'owned items' && (
            <div className="text-gray-400">
              <OwnedItems 
                ownerAddress={userProfile.address} 
                isOwner={isOwner} 
              />
            </div>
          )}
          {activeTab === 'created' && (
            <div className="text-gray-400">
            <CreatedTab 
              isOwner={isOwner} 
              userAddress={userProfile.address} 
            />
          </div>
          )} 
          
          {activeTab === 'activity' && (
            <div className="">
            <ActivityTab 
              isOwner={isOwner} 
              userAddress={userProfile.address} 
            />
          </div>
          )}
          {activeTab === 'collections' && (
            <div className="">
              <CollectionsTab
                isOwner={isOwner}
                userAddress={userProfile.address}
              />
            </div>
          )}
          {activeTab === 'offers/bids' && (
            <div className=""> 
              <OffersBidsTab
                isOwner={isOwner}
                userAddress={userProfile.address}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;