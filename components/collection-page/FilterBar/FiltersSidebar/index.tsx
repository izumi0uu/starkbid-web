import StatusFilter from './StatusFilter';
import PriceFilter from './PriceFilter';
import MarketplaceFilter from './MarketplaceFilter';
import TraitsFilter from './TraitsFilter';
import FilterCategory from './FilterCategory';
import React from 'react';

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
  return (
    <aside className="w-full sm:w-[320px] max-w-full bg-[#18181B] flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#23232A]">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-[#8B5CF6] text-sm hover:underline hover:text-[#7c3aed] transition-colors"
        >
          Clear filters
        </button>
      </div>
      {/* Filtros */}
      <div className="p-4 space-y-6">
        <FilterCategory
          title={<span>Status</span>}
          isOpen={openSections.status}
          onToggle={() => onToggleSection('status')}
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