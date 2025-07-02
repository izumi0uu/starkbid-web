import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SortOption } from '@/types/owners.types';

interface OwnersFilterProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const OwnersFilter: React.FC<OwnersFilterProps> = ({
  sortBy,
  onSortChange}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'mostOwned', label: 'Most Owned' },
    { value: 'highestValue', label: 'Highest Value' },
    { value: 'recentActivity', label: 'Recent Activity' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || 'Most Owned';

  return (
    <div className="mb-6">
      <div className="flex items-center bg-[#1C1D1F] w-[11em] rounded-lg pl-3 py-2">
        <span className="text-white text-sm mr-2 ">Items:</span>
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center space-x-2 px-0 py-0 bg-transparent text-white hover:text-gray-300 transition-colors"
          >
            <span className="text-sm">{currentSortLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isSortOpen && (
            <div className="absolute -left-14 mt-5 w-48 bg-[#1C1D1F] border border-[#292929] rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#2a2b2e] first:rounded-t-lg last:rounded-b-lg transition-colors text-sm"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnersFilter;