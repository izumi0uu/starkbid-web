import React from 'react';
import OwnerCard from './owners-card';
import { Owner } from '@/types/owners.types';

interface OwnerGridProps {
  owners: Owner[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-8">
    <p className="text-red-400">{message}</p>
  </div>
);

const OwnerGrid: React.FC<OwnerGridProps> = ({
  owners,
  loading,
  error,
  hasMore,
  onLoadMore
}) => {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {owners.map((owner) => (
          <OwnerCard
            key={owner.address}
            owner={owner}
          />
        ))}
      </div>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && owners.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="bg-[#1C1D1F] hover:bg-[#2a2b2e] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Load More
          </button>
        </div>
      )}
      {!loading && owners.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-400">No owners found</p>
        </div>
      )}
    </div>
  );
};

export default OwnerGrid;