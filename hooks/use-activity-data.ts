"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  ActivityItem,
  ActivityFilters,
  SortField,
  SortDirection,
} from "@/types/activity";

interface UseActivityDataProps {
  collectionId: string;
  initialFilters?: Partial<ActivityFilters>;
}

interface UseActivityDataReturn {
  activities: ActivityItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  filters: ActivityFilters;
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField, direction: SortDirection) => void;
  handleFilter: (filters: ActivityFilters) => void;
  handlePageChange: (page: number) => void;
  addNewActivity: (activity: ActivityItem) => void;
}

/**
 * Custom hook for managing activity data with filtering, sorting, and pagination
 */
export function useActivityData({
  collectionId,
  initialFilters,
}: UseActivityDataProps): UseActivityDataReturn {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const [filters, setFilters] = useState<ActivityFilters>({
    transactionTypes: [],
    priceRange: { min: null, max: null },
    dateRange: { from: null, to: null },
    users: [],
    ...initialFilters,
  });

  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const fetchActivities = useCallback(
    async (page: number = currentPage) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: itemsPerPage.toString(),
          sort: `${sortField}_${sortDirection}`,
        });

        if (filters.transactionTypes.length > 0) {
          filters.transactionTypes.forEach((type) => {
            params.append("types", type);
          });
        }

        if (filters.priceRange.min !== null) {
          params.append("priceMin", filters.priceRange.min.toString());
        }

        if (filters.priceRange.max !== null) {
          params.append("priceMax", filters.priceRange.max.toString());
        }

        if (filters.dateRange.from) {
          params.append("dateFrom", filters.dateRange.from.toISOString());
        }

        if (filters.dateRange.to) {
          params.append("dateTo", filters.dateRange.to.toISOString());
        }

        if (filters.users.length > 0) {
          filters.users.forEach((user) => {
            params.append("users", user);
          });
        }

        const response = await fetch(
          `/api/collections/${collectionId}/activity?${params}`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: Failed to fetch activities`
          );
        }

        const data = await response.json();

        setActivities(data.activities);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
        setTotalItems(data.total);
        setCurrentPage(page);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("[ActivityData] Fetch error:", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [collectionId, sortField, sortDirection, filters, itemsPerPage, currentPage]
  );

  const handleSort = useCallback(
    (field: SortField, direction: SortDirection) => {
      setSortField(field);
      setSortDirection(direction);
      setCurrentPage(1);
    },
    []
  );

  const handleFilter = useCallback((newFilters: ActivityFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchActivities(page);
    },
    [fetchActivities]
  );

  const addNewActivity = useCallback(
    (activity: ActivityItem) => {
      setActivities((prev) => [activity, ...prev.slice(0, itemsPerPage - 1)]);
    },
    [itemsPerPage]
  );

  useEffect(() => {
    fetchActivities(1);
  }, [fetchActivities]);

  return {
    activities,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    filters,
    sortField,
    sortDirection,
    handleSort,
    handleFilter,
    handlePageChange,
    addNewActivity,
  };
}
