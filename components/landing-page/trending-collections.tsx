"use client";

import { trendingCollections } from "@/constants/data";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Arrow from "@/public/arrow.png";

// constants
const TIMEFRAMES = ["1h", "6h", "24h", "3d", "7d"];
const BLOCKCHAINS = ["Ethereum", "Bitcoin", "Solana", "Polygon"];

// Reusable button styles
const getTabButtonStyles = (isActive: boolean) => `
  text-[20px] px-4 py-2 rounded-md 
  ${isActive 
    ? "text-white font-bold bg-[#1C1D1F]" 
    : "text-gray-500"}
`;

const TimeframeSelector: React.FC<{
  timeframe: string;
  onTimeframeChange: (frame: string) => void;
}> = ({ timeframe, onTimeframeChange }) => (
  <div className="flex space-x-2 h-full bg-[#272729] p-1 rounded-md">
    {TIMEFRAMES.map((frame) => (
      <button
        key={frame}
        className={`px-5 py-2 rounded-md ${
          timeframe === frame ? "bg-[#101213] text-white" : ""
        }`}
        onClick={() => onTimeframeChange(frame)}
      >
        {frame}
      </button>
    ))}
  </div>
);

const BlockchainDropdown: React.FC<{
  blockchain: string;
  onBlockchainChange: (chain: string) => void;
}> = ({ blockchain, onBlockchainChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full">
      <button
        className="flex items-center h-full bg-[#272729] px-4 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {blockchain}
        <ChevronDownIcon className="ml-2 w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-4 right-0 bg-[#272729] p-2 rounded-lg shadow-lg z-10">
          {BLOCKCHAINS.map((chain) => (
            <button
              key={chain}
              className="w-full text-left px-4 py-2 hover:bg-[#101213]"
              onClick={() => {
                onBlockchainChange(chain);
                setIsOpen(false);
              }}
            >
              {chain}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CollectionTableRow: React.FC<(typeof trendingCollections)[0]> = ({
  id,
  icon,
  name,
  floorPrice,
  volume,
  topOffer,
  change,
  sales,
  holder,
  rate,
}) => (
  <tr className="hover:bg-zinc-900 transition-colors duration-300 px-2">
    <td>{id}</td>
    <td className="p-2 flex items-center">
      <div className="relative mr-3">
        <Image
          src={icon}
          width={70}
          height={70}
          alt={name}
          className="w-[70px] h-[70px] rounded-full"
        />
        <div className="w-5 h-5 absolute bottom-0 right-5 flex justify-center items-center rounded-full bg-white">
          <Image
            src="/collections_icons/eth.svg"
            width={12}
            height={12}
            alt="Ethereum"
            className="w-full h-full"
          />
        </div>
      </div>
      {name}
    </td>
    <td className="text-left p-2">{floorPrice}</td>
    <td className="text-left p-2">{volume}</td>
    <td className="text-left p-2">{topOffer}</td>
    <td
      className={`text-left p-2 ${
        change.startsWith("+") ? "text-green-500" : "text-red-500"
      }`}
    >
      {change}
    </td>
    <td className="text-left p-2">{sales}</td>
    <td className="text-left p-2">
      <span>{holder}%</span>
      <br />
      <span className="text-[#A3A3A3]">{rate}</span>
    </td>
  </tr>
);

const ViewAllButton: React.FC = () => (
  <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors">
    View all
    <Image src={Arrow} alt="arrow icon" />
  </button>
);

const TrendingCollections: React.FC = () => {
  const [activeTab, setActiveTab] = useState("collections");
  const [timeframe, setTimeframe] = useState<string>("1h");
  const [blockchain, setBlockchain] = useState<string>("Ethereum");

  return (
    <div className="bg-black text-white px-10 rounded-lg">
      {/* Tabs */}
      <div className="flex gap-[1em] mb-8">
        <button
          className={getTabButtonStyles(activeTab === "collections")}
          onClick={() => setActiveTab("collections")}
        >
          Collections
        </button>
        <button
          className={getTabButtonStyles(activeTab === "marketPlaces")}
          onClick={() => setActiveTab("marketPlaces")}
        >
          Marketplaces
        </button>
      </div>

      {/* Header and Filters */}
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-xl font-bold">Trending Collections</h2>
        <div className="flex gap-3 items-center justify-center h-12">
          <TimeframeSelector 
            timeframe={timeframe} 
            onTimeframeChange={setTimeframe} 
          />
          <BlockchainDropdown 
            blockchain={blockchain} 
            onBlockchainChange={setBlockchain} 
          />
          <ViewAllButton />
        </div>
      </div>

      {/* Collections Table */}
      <table className="w-full text-sm">
        <thead className="border-b border-white/60 text-white/60 text-left uppercase text-sm px-2">
          <tr>
            {[
              "#", "Collection", "Floor Price", "Volume", "Top Offer", 
              "Floor Id", "Sales", "Holders"
            ].map((header) => (
              <th key={header} className="font-light py-5">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trendingCollections.map((collection) => (
            <CollectionTableRow key={collection.id} {...collection} />
          ))}
        </tbody>
      </table>

      {/* View All Collections Button */}
      <div className="flex justify-center mt-10">
        <ViewAllButton />
      </div>
    </div>
  );
};

export default TrendingCollections;