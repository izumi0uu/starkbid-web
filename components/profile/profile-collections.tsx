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
import CreatedTab from "./CreatedTab/CreatedTab";
import ProfileFilters from "./ProfileFilters";
import { FilterState, TraitCategory } from "../collection-page/FilterBar/FiltersSidebar";
import { useRouter, useSearchParams } from 'next/navigation';

const tabs = [
  { id: "owned", label: "Owned Items", active: true },
  { id: "created", label: "Created", active: false },
  { id: "activity", label: "Activity", active: false },
  { id: "collections", label: "Collections", active: false },
  { id: "offers", label: "Offers/Bids", active: false },
];

interface CollectionTabsProps {
  userAddress?: string;
  isOwner?: boolean;
}

export default function CollectionTabs({ 
  userAddress = "", 
  isOwner = false 
}: CollectionTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("owned");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Utilidad para parsear filtros desde la URL
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

  // Utilidad para serializar filtros a la URL
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

  // Inicializa filtros desde la URL
  const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromURL(searchParams));

  // Sincroniza filtros con la URL al cambiar
  useEffect(() => {
    const url = serializeFiltersToURL(filters);
    router.replace(`?${url}`, { scroll: false });
  }, [filters, router]);

  // Si la URL cambia externamente, actualiza los filtros
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

  // Mock traits data - you can reemplazar esto por datos reales
  const availableTraits: TraitCategory[] = [
    { name: 'Background', values: [
      { value: 'Blue', count: 12 },
      { value: 'Red', count: 8 },
      { value: 'Green', count: 5 },
    ] },
    { name: 'Eyes', values: [
      { value: 'Laser', count: 3 },
      { value: 'Normal', count: 10 },
      { value: 'Closed', count: 2 },
    ] },
  ];

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

  // Bloquear scroll del body en mobile cuando el sidebar está abierto
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
        return (
          <CreatedTab 
            userAddress={userAddress} 
            isOwner={isOwner} 
          />
        );
      case "owned":
      case "activity":
      case "collections":
      case "offers":
      default:
        return (
          <div className="w-full h-full">
            {/* Search and Filter Section - only show for non-created tabs */}
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
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-32 bg-gray-800/50 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="price_low">Low to High</SelectItem>
                        <SelectItem value="price_high">High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className={`border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent ${isFiltersOpen ? 'bg-gray-800 text-white' : ''}`}
                  >
                    {isFiltersOpen ? (
                      <ChevronLeft className="w-4 h-4 mr-2" />
                    ) : (
                      <ListFilter className="w-4 h-4 mr-2" />
                    )}
                    Filters
                  </Button>
                </div>
              </div>
            </div>
            {/* Contenedor flex para grid + sidebar */}
            <div className="flex w-full transition-all duration-300">
              {/* NFT Grid/Content */}
              <div className={`transition-all duration-300 ${isFiltersOpen ? 'w-full md:w-[calc(100%-320px)]' : 'w-full'}`}>
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
              {/* Overlay oscuro (backdrop) */}
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
      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}