import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search by trait..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 bg-[#1C1D1F] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
      />
    </div>
  );
};

export default SearchInput;