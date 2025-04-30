"use client";
import React, { useState, useMemo } from "react";
import { nftData } from "./data";
import NFTCard from "./NFTCard";

const TrendingNFTs = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Trending"); 
  const [filterOption, setFilterOption] = useState("All"); 

  // Filter and sort NFTs
  const filteredNFTs = useMemo(() => {
   
    let result = nftData.filter((nft) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        nft.title.toLowerCase().includes(query) ||
        nft.creatorName.toLowerCase().includes(query) ||
        (nft.tags && nft.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    });

    
    switch (filterOption) {
      case "LowPrice":
        result = result.filter((nft) => nft.currentBid <= 100); 
        break;
      case "HighPrice":
        result = result.filter((nft) => nft.currentBid > 100); 
        break;
      case "All":
      default:
        break; 
    }

   
    switch (sortOption) {
      case "Newest":
        return [...result].sort((a, b) => b.minted - a.minted);
      case "Oldest":
        return [...result].sort((a, b) => a.minted - b.minted);
      case "Trending":
      default:
        return [...result].sort((a, b) => b.likes - a.likes);
    }
  }, [searchQuery, sortOption, filterOption]); 

 
  const displayedNFTs = useMemo(() => {
    if (activeTab === "trending") {
      return filteredNFTs;
    } else if (activeTab === "top") {
      return [...filteredNFTs].sort((a, b) => b.currentBid - a.currentBid);
    }
    return filteredNFTs;
  }, [filteredNFTs, activeTab]);

  return (
    <div className="bg-black text-white p-6 max-w-[1419px] mx-auto">
      <div className="flex flex-col md:flex-col md:items-start md:justify-start sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        {/* Tabs */}
        <div className="flex gap-3 sm:gap-4 md:mb-10">
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

        {/* Search and Dropdowns */}
        <div className="md:w-full flex flex-col sm:flex-row md:justify-between gap-3 sm:gap-4 items-center w-full sm:w-auto md:mt-6">
          <input
            type="text"
            placeholder="Search by NFTs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1C1D1F] md:w-[60%] text-white placeholder-gray-500 text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-md outline-none border border-[#292929] w-full sm:w-48"
          />

          <div className="md:w-[20%] flex flex-row justify-between gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#1C1D1F] text-white text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-md outline-none border border-[#292929] w-full sm:w-auto"
            >
              <option value="Trending">Trending</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>

            {/* Filter Dropdown */}
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="bg-[#1C1D1F] text-white text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-md outline-none border border-[#292929] w-full sm:w-auto"
            >
              <option value="All">All</option>
              <option value="LowPrice">Low Price</option>
              <option value="HighPrice">High Price</option>
            </select>
          </div>
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