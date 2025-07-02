"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CollectionHeader from "@/components/collection-page/CollectionHeader";
import CollectionStats from "@/components/collection-page/CollectionStats";
import CollectionTabs from "@/components/collection-page/CollectionTabs";
import FilterBar from "@/components/collection-page/FilterBar/FilterBar";
import NFTGrid from "@/components/collection-page/NFTGrid";
import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";
import ActivityTab from "@/components/activity";

interface CollectionPageProps {
  params: {
    id: string;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = params.id;

  // Get initial tab from URL params or default to 'Items'
  const getInitialTab = useCallback(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab === "activity") return "Activity";
    if (urlTab === "about") return "About";
    if (urlTab === "owner") return "Owner";
    return "Items";
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState<string>(getInitialTab());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recently Listed");

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    // Update URL with search params
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "Items") {
      params.delete("tab"); // Remove tab param for default tab
    } else {
      params.set("tab", tab.toLowerCase());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.push(newUrl, { scroll: false });
  };

  // Listen for URL changes (back/forward navigation)
  useEffect(() => {
    const newTab = getInitialTab();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [searchParams, getInitialTab, activeTab]);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <Navbar />
      <CollectionHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CollectionStats />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-28">
        <CollectionTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        {/* Conditional content based on active tab */}
        {activeTab === "Items" && (
          <>
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <NFTGrid />
          </>
        )}

        {activeTab === "Activity" && (
          <ActivityTab collectionId={collectionId} isActive={true} />
        )}

        {activeTab === "About" && (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              About This Collection
            </h2>
            <p className="text-gray-400">About content coming soon...</p>
          </div>
        )}

        {activeTab === "Owner" && (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Owners</h2>
            <p className="text-gray-400">Owner information coming soon...</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;
