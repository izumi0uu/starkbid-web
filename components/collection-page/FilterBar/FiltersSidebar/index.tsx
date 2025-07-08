import StatusFilter from './StatusFilter';
import PriceFilter from './PriceFilter';
import MarketplaceFilter from './MarketplaceFilter';
import TraitsFilter from './TraitsFilter';
import FilterCategory from './FilterCategory';
import React, { useState } from 'react';

export interface FilterState {
  status: 'all' | 'listed' | 'owned_by_you';
  priceRange: {
    min: string;
    max: string;
    currency: string;
  };
  marketplaces: string[];
  traits: Record<string, string[]>;
}

export interface TraitCategory {
  name: string;
  values: { value: string; count: number }[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  availableTraits: TraitCategory[];
  openSections: {
    status: boolean;
    price: boolean;
    marketplace: boolean;
    traits: boolean;
  };
  onToggleSection: (section: keyof FilterSidebarProps['openSections']) => void;
}

const FiltersSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  availableTraits,
  openSections,
  onToggleSection,
}) => {

  const [loading] = useState(false);
  const resultCount = 123;

  const isStatusActive = filters.status !== 'all';
  const isPriceActive = (filters.priceRange.min !== '' || filters.priceRange.max !== '') && filters.priceRange.currency === 'ETH';
  const isMarketplaceActive = filters.marketplaces.length > 0;
  const isTraitsActive = Object.values(filters.traits).some(arr => arr.length > 0);
  const anyActive = isStatusActive || isPriceActive || isMarketplaceActive || isTraitsActive;

  return (
    <aside className="w-full sm:w-[320px] max-w-full bg-[#18181B] flex flex-col shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-[#23232A]">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        {anyActive && (
          <button
            onClick={onClearFilters}
            className="text-[#8B5CF6] text-sm hover:underline hover:text-[#7c3aed] transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="px-4 pt-2 pb-1 flex items-center gap-2 min-h-[32px]">
        {loading ? (
          <span className="w-5 h-5 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin inline-block" />
        ) : (
          <span className="text-xs text-gray-400">{resultCount} results</span>
        )}
      </div>
      <div className="p-4 space-y-6">
        <FilterCategory
          title={<span>Status</span>}
          isOpen={openSections.status}
          onToggle={() => onToggleSection('status')}
          isActive={isStatusActive}
          onClear={() => onFiltersChange({ ...filters, status: 'all' })}
        >
          <StatusFilter
            value={filters.status}
            onChange={status => onFiltersChange({ ...filters, status })}
          />
        </FilterCategory>
        <FilterCategory
          title={<span>Price</span>}
          isOpen={openSections.price}
          onToggle={() => onToggleSection('price')}
          isActive={isPriceActive}
          onClear={() => onFiltersChange({ ...filters, priceRange: { ...filters.priceRange, min: '', max: '' } })}
        >
          <PriceFilter
            value={filters.priceRange}
            onChange={priceRange => onFiltersChange({ ...filters, priceRange })}
          />
        </FilterCategory>
        <FilterCategory
          title={<span>Market Place</span>}
          isOpen={openSections.marketplace}
          onToggle={() => onToggleSection('marketplace')}
          isActive={isMarketplaceActive}
          onClear={() => onFiltersChange({ ...filters, marketplaces: [] })}
        >
          <MarketplaceFilter
            value={filters.marketplaces}
            onChange={marketplaces => onFiltersChange({ ...filters, marketplaces })}
          />
        </FilterCategory>
        <FilterCategory
          title={<span>Properties/Traits</span>}
          isOpen={openSections.traits}
          onToggle={() => onToggleSection('traits')}
          isActive={isTraitsActive}
          onClear={() => onFiltersChange({ ...filters, traits: {} })}
        >
          <TraitsFilter
            value={filters.traits}
            onChange={traits => onFiltersChange({ ...filters, traits })}
            availableTraits={availableTraits}
          />
        </FilterCategory>
      </div>
    </aside>
  );
};

export default FiltersSidebar; 