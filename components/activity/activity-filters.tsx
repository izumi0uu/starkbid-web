"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { cn } from "@/lib/utils";
import { type ActivityFilters, TransactionType } from "@/types/activity";
import { TransactionBadge } from "./transaction-badge";
import type { DateRange } from "react-day-picker";

interface ActivityFiltersProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  isMobile?: boolean;
  isTablet?: boolean;
}

export function ActivityFiltersComponent({
  filters,
  onFiltersChange,
  isMobile,
  isTablet,
}: ActivityFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ActivityFilters>(filters);

  // Sync local filters with props when filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyFilters = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onFiltersChange(localFilters);
      setIsOpen(false);
    },
    [localFilters, onFiltersChange]
  );

  const handleResetFilters = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const resetFilters: ActivityFilters = {
        transactionTypes: [],
        priceRange: { min: null, max: null },
        dateRange: { from: null, to: null },
        users: [],
      };
      setLocalFilters(resetFilters);
      onFiltersChange(resetFilters);
      setIsOpen(false);
    },
    [onFiltersChange]
  );

  const handleTransactionTypeChange = useCallback(
    (type: TransactionType, checked: boolean) => {
      setLocalFilters((prev) => ({
        ...prev,
        transactionTypes: checked
          ? [...prev.transactionTypes, type]
          : prev.transactionTypes.filter((t) => t !== type),
      }));
    },
    []
  );

  const handlePriceMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalFilters((prev) => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          min: value ? Number.parseFloat(value) : null,
        },
      }));
    },
    []
  );

  const handlePriceMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalFilters((prev) => ({
        ...prev,
        priceRange: {
          ...prev.priceRange,
          max: value ? Number.parseFloat(value) : null,
        },
      }));
    },
    []
  );

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setLocalFilters((prev) => ({
      ...prev,
      dateRange: {
        from: range?.from || null,
        to: range?.to || null,
      },
    }));
  }, []);

  const activeFiltersCount =
    localFilters.transactionTypes.length +
    (localFilters.priceRange.min !== null ||
    localFilters.priceRange.max !== null
      ? 1
      : 0) +
    (localFilters.dateRange.from !== null || localFilters.dateRange.to !== null
      ? 1
      : 0) +
    localFilters.users.length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "border-light_grey bg-true_black text-misty_white hover:bg-darkGray hover:text-misty_white hover:border-light_grey",
            isMobile && "w-full justify-between touch-manipulation h-12",
            isTablet && "touch-manipulation"
          )}
        >
          <div className="flex items-center text-misty_white">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "bg-true_black border-light_grey text-misty_white",
          isMobile && "h-[90vh]"
        )}
      >
        <SheetHeader>
          <SheetTitle className="text-misty_white">Filter Activity</SheetTitle>
          <SheetDescription className="text-soft_grey">
            Filter activities by transaction type, price range, and date.
          </SheetDescription>
        </SheetHeader>

        <div className={cn("py-6 space-y-6", isMobile && "pb-24")}>
          {/* Transaction Types */}
          <div>
            <Label className="text-sm font-medium mb-3 block text-misty_white">
              Transaction Types
            </Label>
            <div
              className={cn("space-y-3", isMobile && "grid grid-cols-2 gap-3")}
            >
              {Object.values(TransactionType).map((type) => (
                <div key={type} className="flex items-center space-x-3">
                  <Checkbox
                    id={`filter-${type}`}
                    checked={localFilters.transactionTypes.includes(type)}
                    onCheckedChange={(checked) =>
                      handleTransactionTypeChange(type, checked as boolean)
                    }
                    className={cn(
                      "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
                      isMobile && "touch-manipulation"
                    )}
                  />
                  <Label
                    htmlFor={`filter-${type}`}
                    className="cursor-pointer flex-1 text-misty_white"
                  >
                    <TransactionBadge
                      type={type}
                      className={isMobile ? "text-xs" : ""}
                    />
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block text-misty_white">
              Price Range (ETH)
            </Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.priceRange.min || ""}
                onChange={handlePriceMinChange}
                className={cn(
                  "bg-darkerGray dark:bg-darkerGray border-light_grey text-misty_white placeholder:text-soft_grey",
                  isMobile && "touch-manipulation h-12"
                )}
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.priceRange.max || ""}
                onChange={handlePriceMaxChange}
                className={cn(
                  "bg-darkerGray dark:bg-darkerGray border-light_grey text-misty_white placeholder:text-soft_grey",
                  isMobile && "touch-manipulation h-12"
                )}
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block text-misty_white">
              Date Range
            </Label>
            <DatePickerWithRange
              from={localFilters.dateRange.from}
              to={localFilters.dateRange.to}
              onSelect={handleDateRangeChange}
              isMobile={isMobile}
            />
          </div>
        </div>

        <SheetFooter
          className={cn(
            isMobile &&
              "fixed bottom-0 left-0 right-0 p-6 bg-deepGray border-t border-light_grey"
          )}
        >
          <div className="flex space-x-3 w-full">
            <Button
              onClick={handleApplyFilters}
              className={cn(
                "flex-1 bg-blue-600 hover:bg-blue-700 text-white",
                isMobile && "touch-manipulation h-12"
              )}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className={cn(
                "border-light_grey bg-transparent text-misty_white hover:bg-darkGray hover:text-misty_white hover:border-light_grey",
                isMobile ? "touch-manipulation h-12 w-12 p-0" : ""
              )}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
