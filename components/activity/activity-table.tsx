"use client";

import { cn } from "@/lib/utils";

import { TableCell } from "@/components/ui/table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { ActivityItem } from "@/types/activity";
import { ActivityRow } from "./activity-row";
import { ActivityCardList } from "./activity-card-list";
import { useIsMobile, useIsTablet } from "@/hooks/use-media-query";

interface ActivityTableProps {
  activities: ActivityItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onActivityClick?: (activity: ActivityItem) => void;
}

export function ActivityTable({
  activities,
  loading,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onActivityClick,
}: ActivityTableProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
            size="default"
            className={cn(
              "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
              currentPage === 1 && "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis className="text-soft_grey" />
          </PaginationItem>
        );
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            size="default"
            className={cn(
              "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
              currentPage === i && "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis className="text-soft_grey" />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
            size="default"
            className={cn(
              "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
              currentPage === totalPages &&
                "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  // Mobile card layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        <ActivityCardList
          activities={activities}
          loading={loading}
          onActivityClick={onActivityClick}
        />
        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center space-y-2">
            <div className="text-sm text-soft_grey">
              Page {currentPage} of {totalPages} ({totalItems} total)
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className={cn(
                      "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
                      currentPage === 1 && "pointer-events-none opacity-50"
                    )}
                    size="default"
                  />
                </PaginationItem>
                {generatePaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    className={cn(
                      "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
                      currentPage === totalPages &&
                        "pointer-events-none opacity-50"
                    )}
                    size="default"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  }

  // Desktop and Tablet table layout
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-light_grey bg-deepGray">
        <div
          className={`overflow-x-auto ${
            isTablet ? "scrollbar-thin scrollbar-thumb-gray-600" : ""
          }`}
        >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-light_grey hover:bg-transparent">
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[200px]" : "w-[25%]"
                  } min-w-[180px]`}
                >
                  Items
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[100px]" : "w-[15%]"
                  } min-w-[80px]`}
                >
                  Type
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[120px]" : "w-[15%]"
                  } min-w-[100px]`}
                >
                  Price
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[60px]" : "w-[10%]"
                  } min-w-[50px]`}
                >
                  #
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[50px]" : "w-[8%]"
                  } min-w-[40px]`}
                >
                  QTY
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[100px]" : "w-[12%]"
                  } min-w-[90px]`}
                >
                  From
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[100px]" : "w-[12%]"
                  } min-w-[90px]`}
                >
                  To
                </TableHead>
                <TableHead
                  className={`text-soft_grey font-medium ${
                    isTablet ? "w-[120px]" : "w-[15%]"
                  } min-w-[110px]`}
                >
                  Date & Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Loading skeletons
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRow
                    key={`skeleton-${index}`}
                    className="border-light_grey"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full bg-darkerGray dark:bg-darkerGray" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32 bg-darkerGray dark:bg-darkerGray" />
                          <Skeleton className="h-3 w-16 bg-darkerGray dark:bg-darkerGray" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 bg-darkerGray dark:bg-darkerGray" />
                    </TableCell>
                  </TableRow>
                ))
              ) : activities.length > 0 ? (
                // Actual data
                activities.map((activity) => (
                  <ActivityRow
                    key={activity.id}
                    activity={activity}
                    onClick={onActivityClick}
                    isTablet={isTablet}
                  />
                ))
              ) : (
                // Empty state
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-soft_grey"
                  >
                    No activities found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Desktop/Tablet Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-soft_grey">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            results
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={cn(
                    "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                  size="default"
                />
              </PaginationItem>
              {generatePaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className={cn(
                    "bg-transparent border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white",
                    currentPage === totalPages &&
                      "pointer-events-none opacity-50"
                  )}
                  size="default"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
