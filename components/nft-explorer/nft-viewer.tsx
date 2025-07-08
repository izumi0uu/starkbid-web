import React, { useState, useEffect } from 'react'
import NftFilterBar from './nft-filter-Bar'
import NftGridTable from './ntf-grid-table'
import { TraitCategory } from '../collection-page/FilterBar/FiltersSidebar'
import { FilterState } from '../collection-page/FilterBar/FiltersSidebar'
import { useRouter, useSearchParams } from 'next/navigation'
import { NFT } from '../profile/NFTCard/NFTCard.types'

interface NftViewerProps {
  mockNFTs: NFT[];
}

const NftViewer = ({ mockNFTs }: NftViewerProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [showGrid] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("price_low");
    const [filters, setFilters] = useState<FilterState>(() => parseFiltersFromURL(searchParams));
    const [openSections, setOpenSections] = useState({
        status: true,
        price: true,
        marketplace: true,
        traits: true,
      });

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

  useEffect(() => {
    const url = serializeFiltersToURL(filters);
    router.replace(`?${url}`, { scroll: false });
  }, [filters, router]);

  useEffect(() => {
    setFilters(parseFiltersFromURL(searchParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <div className="w-full h-full">
            <NftFilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
            />
            <NftGridTable
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              showGrid={showGrid}
              searchTerm={searchTerm}
              filters={filters}
              sortOption={sortOption}
              setSortOption={setSortOption}
              availableTraits={availableTraits}
              openSections={openSections}
              mockNFTs={mockNFTs}
              setFilters={setFilters}
              handleToggleSection={handleToggleSection}
              handleClearFilters={handleClearFilters}
            />
          </div>
  )
}

export default NftViewer