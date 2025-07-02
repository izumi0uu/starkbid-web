import React, { useState } from 'react';
import OwnerGrid from './owners-grid';
import OwnersFilter from './owners-filter';
import { useOwners } from './hooks/use-owners';
import { SortOption } from '@/types/owners.types';

interface OwnersTabProps {
  collectionId: string;
}

const OwnersTab: React.FC<OwnersTabProps> = ({ collectionId }) => {
  const [sortBy, setSortBy] = useState<SortOption>('mostOwned');
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    owners,
    loading,
    error,
    hasMore,
    loadMore
  } = useOwners(collectionId, sortBy, searchTerm);

  return (
    <div className="owners-tab mb-[3em]">
      <OwnersFilter
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <OwnerGrid
        owners={owners}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default OwnersTab;