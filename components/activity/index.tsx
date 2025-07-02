"use client";

import { useState } from "react";
import { ActivitySort } from "./activity-sort";
import { ActivityFiltersComponent } from "./activity-filters";
import { ActivityTable } from "./activity-table";
import { useActivityData } from "@/hooks/use-activity-data";
import { useWebSocket } from "@/hooks/use-websocket";
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query";
import type { ActivityTabProps, ActivityItem } from "@/types/activity";
import { cn } from "@/lib/utils";

/**
 * Main Activity Tab Component - orchestrates the complete NFT activity interface
 */
export function ActivityTab({ collectionId, isActive }: ActivityTabProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(
    null
  );

  console.log(selectedActivity);

  // Responsive breakpoints
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Data management
  const {
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
  } = useActivityData({ collectionId });

  // Real-time updates
  const { isConnected } = useWebSocket({
    collectionId,
    onNewActivity: addNewActivity,
  });

  if (!isActive) return null;

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 bg-deep-gray rounded-lg border border-light-grey">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Error Loading Activities</p>
          <p className="text-sm text-soft-grey">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div
        className={cn(
          "flex items-center justify-between",
          isMobile && "flex-col space-y-4 items-stretch"
        )}
      >
        <div
          className={cn(
            "flex items-center space-x-4",
            isMobile && "flex-col space-y-3 space-x-0 w-full"
          )}
        >
          <ActivitySort
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <ActivityFiltersComponent
            filters={filters}
            onFiltersChange={handleFilter}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>

        {/* Connection status */}
        <div
          className={cn(
            "flex items-center space-x-2",
            isMobile && "justify-center w-full"
          )}
        >
          <div
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-xs text-soft-grey">
            {isConnected ? "Live" : "Disconnected"}
          </span>
          {totalItems > 0 && (
            <>
              <span className="text-text-grey">•</span>
              <span className="text-xs text-soft-grey">
                {totalItems.toLocaleString()} total activities
              </span>
            </>
          )}
        </div>
      </div>

      {/* Activity Table */}
      <ActivityTable
        activities={activities}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onActivityClick={setSelectedActivity}
      />
    </div>
  );
}

export default ActivityTab;
