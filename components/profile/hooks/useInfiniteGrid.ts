'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteGridParams {
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  threshold?: number;
}

export const useInfiniteGrid = ({
  loading,
  hasMore,
  loadMore,
  threshold = 200,
}: UseInfiniteGridParams) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;

    if (!isNearBottom || loading || !hasMore) return;
    setIsFetching(true);
  }, [loading, hasMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isFetching && !loading) {
      loadMore();
      setIsFetching(false);
    }
  }, [isFetching, loading, loadMore]);

  return { isFetching };
};