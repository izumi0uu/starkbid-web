import React from 'react'
import NFTGrid from '../profile/NFTGrid/NFTGrid';
import SidebarFilters from './sidebar-filters';
import Image from 'next/image';
import { FilterState } from '../collection-page/FilterBar/FiltersSidebar';
import { TraitCategory } from '../collection-page/FilterBar/FiltersSidebar';
import { NFT } from '../profile/NFTCard/NFTCard.types';

interface NftGridTableProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (value: boolean) => void;
  showGrid: boolean;
  searchTerm: string;
  filters: FilterState;
  sortOption: string;
  setSortOption: (value: string) => void;
  availableTraits: TraitCategory[];
  openSections: {
    status: boolean;
    price: boolean;
    marketplace: boolean;
    traits: boolean;
  };
  mockNFTs: NFT[];
  setFilters: (value: FilterState) => void;
  handleToggleSection: (section: keyof NftGridTableProps['openSections']) => void;
  handleClearFilters: () => void;
}

const NftGridTable = ({
  isFiltersOpen,
  setIsFiltersOpen,
  showGrid,
  searchTerm,
  filters,
  sortOption,
  availableTraits,
  openSections,
  mockNFTs,
  setFilters,
  handleToggleSection,
  handleClearFilters,
}: NftGridTableProps) => {
  return (
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
                          // Filtro de marketplace múltiple
                          if (filters.marketplaces && filters.marketplaces.length > 0) {
                            // El valor en filters.marketplaces es en minúsculas (ej: 'opensea'), el de mock es el nombre (ej: 'OpenSea')
                            return filters.marketplaces.some(mp => mp.toLowerCase() === nft.collection.marketplace.toLowerCase());
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
                  bg-transparent
                `}
                style={{ minWidth: isFiltersOpen ? 320 : 0 }}
              >
                <SidebarFilters
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
  )
}

export default NftGridTable