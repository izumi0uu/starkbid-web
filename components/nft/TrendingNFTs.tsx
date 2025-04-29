"use client";
import React, { useState, useMemo } from "react";
import { nftData } from "./data";
import NFTCard from "./NFTCard";

const TrendingNFTs = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("Trending");

  const filteredNFTs = useMemo(() => {
    const result = nftData.filter((nft) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        nft.title.toLowerCase().includes(query) ||
        nft.creatorName.toLowerCase().includes(query) ||
        (nft.tags && nft.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    });

    switch (filter) {
      case "Newest":
        return [...result].sort((a, b) => b.minted - a.minted);
      case "Oldest":
        return [...result].sort((a, b) => a.minted - b.minted);
      case "Trending":
      default:
        return [...result].sort((a, b) => b.likes - a.likes);
    }
  }, [searchQuery, filter]);

  // Different data for different tabs
  const displayedNFTs = useMemo(() => {
    if (activeTab === "trending") {
      return filteredNFTs;
    } else if (activeTab === "top") {
      // For top tab, sort by currentBid (highest first)
      return [...filteredNFTs].sort((a, b) => b.currentBid - a.currentBid);
    }
    return filteredNFTs;
  }, [filteredNFTs, activeTab]);

  return (
    <div className="bg-black text-white p-6 max-w-[1419px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex gap-3 sm:gap-4">
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 text-base sm:text-lg font-semibold ${
              activeTab === "trending"
                ? "text-white border-b-2 border-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 text-base sm:text-lg font-semibold ${
              activeTab === "top"
                ? "text-white border-b-2 border-white"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("top")}
          >
            Top
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by NFTs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1C1D1F] text-white placeholder-gray-500 text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-md outline-none border border-[#292929] w-full sm:w-48"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#1C1D1F] text-white text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-md outline-none border border-[#292929] w-full sm:w-auto"
          >
            <option value="Trending">Trending</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        {activeTab === "trending" ? "Trending NFTs" : "Top NFTs"}{" "}
        <span className="text-gray-400 text-base">
          {displayedNFTs.length} Items
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedNFTs.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};

export default TrendingNFTs;
