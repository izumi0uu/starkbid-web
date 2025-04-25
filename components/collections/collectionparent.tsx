"use client";
import { useState } from "react";
import CollectionFilters from "./collectionfilter";
import CollectionsPage from "./collections";

export default function CollectionsParent() {
  const [filters, setFilters] = useState({
    activeTab: "trending",
    searchQuery: "",
    blockchain: "Ethereum",
  });

  const handleFilterChange = (newFilters: {
    activeTab: string;
    searchQuery: string;
    blockchain: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <CollectionFilters onFilterChange={handleFilterChange} />
      <CollectionsPage
        activeTab={filters.activeTab}
        searchQuery={filters.searchQuery}
        blockchain={filters.blockchain}
      />
    </div>
  );
}