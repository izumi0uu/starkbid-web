"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ListFilter } from "lucide-react";
import Image from "next/image";
import ProfileFilters from "./ProfileFilters";
import { FilterState, TraitCategory } from "../collection-page/FilterBar/FiltersSidebar";
import { useRouter, useSearchParams } from 'next/navigation';
import NFTGrid from "./NFTGrid/NFTGrid";
import { mockNFTs } from "./lib/mockData";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("owned");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showGrid] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("price_low");

  function parseFiltersFromURL(params: URLSearchParams): FilterState {
    const status = params.get('status') as FilterState['status'] || 'all';
    const price = params.get('price') || '';
    const [min, max] = price.split('-');
    const currency = params.get('currency') || 'ETH';
    const marketplaces = params.get('marketplace')?.split(',').filter(Boolean) || [];
    const traitsParam = params.get('traits') || '';
    const traits: Record<string, string[]> = {};
    if (traitsParam) {
      traitsParam.split(';').forEach(pair => {
        const [cat, vals] = pair.split(':');
        if (cat && vals) traits[cat] = vals.split(',');
      });
    }
    return {
      status,
      priceRange: { min: min || '', max: max || '', currency },
      marketplaces,
      traits,
    };
  }

  function serializeFiltersToURL(filters: FilterState): string {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.priceRange.min || filters.priceRange.max) params.set('price', `${filters.priceRange.min || ''}-${filters.priceRange.max || ''}`);
    if (filters.priceRange.currency && filters.priceRange.currency !== 'ETH') params.set('currency', filters.priceRange.currency);
    if (filters.marketplaces.length > 0) params.set('marketplace', filters.marketplaces.join(','));
    const traitsArr: string[] = [];
    Object.entries(filters.traits).forEach(([cat, vals]) => {
      if (vals.length > 0) traitsArr.push(`${cat}:${vals.join(',')}`);
    });
    if (traitsArr.length > 0) params.set('traits', traitsArr.join(';'));
    return params.toString();
  }

  const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromURL(searchParams));

  useEffect(() => {
    const url = serializeFiltersToURL(filters);
    router.replace(`?${url}`, { scroll: false });
  }, [filters, router]);

  useEffect(() => {
    setFilters(parseFiltersFromURL(searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const [openSections, setOpenSections] = useState({
    status: true,
    price: true,
    marketplace: true,
    traits: true,
  });

  // Extraer traits dinámicamente de los mocks
  function extractAvailableTraits(nfts: { traits?: Record<string, string> }[]): TraitCategory[] {
    const traitMap: Record<string, Record<string, number>> = {};
    nfts.forEach((nft) => {
      Object.entries(nft.traits || {}).forEach(([category, value]) => {
        if (!traitMap[category]) traitMap[category] = {};
        if (!traitMap[category][value]) traitMap[category][value] = 0;
        traitMap[category][value]++;
      });
    });
    // Convertir a formato TraitCategory[]
    return Object.entries(traitMap).map(([name, valuesObj]) => ({
      name,
      values: Object.entries(valuesObj).map(([value, count]) => ({ value, count: Number(count) }))
    }));
  }

  const availableTraits: TraitCategory[] = extractAvailableTraits(mockNFTs);

  const handleToggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      priceRange: { min: '', max: '', currency: 'ETH' },
      marketplaces: [],
      traits: {},
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      if (isFiltersOpen && isMobile) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isFiltersOpen]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "created":
      case "owned":
      case "activity":
      case "collections":
      case "offers":
      default:
        return (
          <div className="w-full h-full">
            <div className="py-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by NFTs"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <div className="flex items-center gap-3 w-full max-w-[320px]">
                  <div className="flex items-center h-11 px-4 rounded-lg bg-[#18181B] border border-[#23232A] w-full">
                    <span className="text-[#8E9BAE] text-sm font-medium mr-2">Price:</span>
                    <Select defaultValue="price_low" value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="bg-transparent border-none shadow-none px-0 h-11 text-white text-sm font-medium flex items-center focus:ring-0 focus:outline-none">
                        <SelectValue className="text-white" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#18181B] border-[#23232A] text-white">
                        <SelectItem value="price_low">Low to High</SelectItem>
                        <SelectItem value="price_high">High to Low</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className={`h-11 px-4 rounded-lg bg-[#18181B] border border-[#23232A] flex items-center text-white text-sm font-medium gap-2 hover:bg-[#23232A] hover:text-white ${isFiltersOpen ? 'bg-[#23232A]' : ''}`}
                  >
                    {isFiltersOpen ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ListFilter className="w-4 h-4" />
                    )}
                    Filters
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full transition-all duration-300">
              <div className={`transition-all duration-300 ${isFiltersOpen ? 'w-full md:w-[calc(100%-335px)]' : 'w-full'}`}>
                {showGrid ? (
                  <NFTGrid
                    items={
                      mockNFTs
                        .filter(nft =>
                          nft.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .filter(nft => {
                          const min = parseFloat(filters.priceRange.min);
                          const max = parseFloat(filters.priceRange.max);
                          const price = parseFloat(nft.price.eth);
                          if (filters.priceRange.min && filters.priceRange.max) {
                            return price >= min && price <= max;
                          } else if (filters.priceRange.min) {
                            return price >= min;
                          } else if (filters.priceRange.max) {
                            return price <= max;
                          }
                          return true;
                        })
                        .filter(nft => {
                          // Filtrado por traits seleccionados
                          const selectedTraits = filters.traits;
                          // Si no hay traits seleccionados, no filtrar
                          if (!selectedTraits || Object.keys(selectedTraits).length === 0) return true;
                          // Cada categoría seleccionada debe estar en el NFT y tener al menos uno de los valores seleccionados
                          return Object.entries(selectedTraits).every(([cat, vals]) => {
                            if (!vals.length) return true;
                            const nftTraitValue = nft.traits?.[cat];
                            return nftTraitValue && vals.includes(nftTraitValue);
                          });
                        })
                        .sort((a, b) => {
                          if (sortOption === 'price_low') {
                            return parseFloat(a.price.eth) - parseFloat(b.price.eth);
                          } else if (sortOption === 'price_high') {
                            return parseFloat(b.price.eth) - parseFloat(a.price.eth);
                          } else if (sortOption === 'newest') {
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                          } else if (sortOption === 'oldest') {
                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                          }
                          return 0;
                        })
                    }
                    loading={false}
                    error={null}
                    hasMore={false}
                    onLoadMore={() => {}}
                    emptyState={{
                      title: "No Items Found",
                      description: "We couldn't find anything for this section."
                    }}
                    gridColsClass={isFiltersOpen ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}
                  />
                ) : (
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
                )}
              </div>
              {isFiltersOpen && (
                <div
                  className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
                  onClick={() => setIsFiltersOpen(false)}
                />
              )}
              <div
                className={`transition-all duration-300
                  ${isFiltersOpen ? 'w-[320px] visible opacity-100' : 'w-0 invisible opacity-0'}
                  md:relative md:z-50
                  fixed top-0 right-0 h-full z-50 md:static
                  bg-[#18181B]
                `}
                style={{ minWidth: isFiltersOpen ? 320 : 0 }}
              >
                <ProfileFilters
                  isOpen={isFiltersOpen}
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableTraits={availableTraits}
                  openSections={openSections}
                  onToggleSection={handleToggleSection}
                  onClearFilters={handleClearFilters}
                  onClose={() => setIsFiltersOpen(false)}
                />
              </div>
            </div>
          </div>
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