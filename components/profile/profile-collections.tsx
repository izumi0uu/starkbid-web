"use client";

import { useState } from "react";
import NftViewer from "../nft-explorer/nft-viewer";
import { profileMockNFTs } from "../../lib/mockData";


const tabs = [
  { id: "owned", label: "Owned Items", active: true },
  { id: "created", label: "Created", active: false },
  { id: "activity", label: "Activity", active: false },
  { id: "collections", label: "Collections", active: false },
  { id: "offers", label: "Offers/Bids", active: false },
];

/* interface CollectionTabsProps {
  userAddress?: string;
  isOwner?: boolean;
} */

export default function CollectionTabs() {
  const [activeTab, setActiveTab] = useState("owned");

  const renderTabContent = () => {
    switch (activeTab) {
      case "created":
      case "owned":
      case "activity":
      case "collections":
      case "offers":
      default:
        return (
          <NftViewer mockNFTs={profileMockNFTs} />
        );
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-[#101213] backdrop-blur-sm px-6">
      <div className="border-b border-white/10">
        <div className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-300"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
}