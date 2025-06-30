"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";

const tabs = [
  { id: "owned", label: "Owned Items", active: true },
  { id: "created", label: "Created", active: false },
  { id: "activity", label: "Activity", active: false },
  { id: "collections", label: "Collections", active: false },
  { id: "offers", label: "Offers/Bids", active: false },
];

export default function CollectionTabs() {
  const [activeTab, setActiveTab] = useState("owned");

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-[#101213] backdrop-blur-sm ">
      {/* Tab Navigation */}
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

      {/* Search and Filter Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by NFTs"
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Price:</span>
              <Select defaultValue="low-to-high">
                <SelectTrigger className="w-32 bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="low-to-high">Low to High</SelectItem>
                  <SelectItem value="high-to-low">High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Empty State Content */}
      <div className="p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src="/empty.png"
              width={287}
              height={225}
              className="w-[287px] h-auto"
              alt="StarkBid logo"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Item Found</h3>
        <p className="text-gray-400 text-sm">
          {"We couldn't find anything for this section."}
        </p>
      </div>
    </div>
  );
}
