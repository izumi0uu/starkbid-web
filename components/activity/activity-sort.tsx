"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { SortField, SortDirection } from "@/types/activity";

interface ActivitySortProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField, direction: SortDirection) => void;
  isMobile?: boolean;
  isTablet?: boolean;
}

const sortOptions = [
  {
    label: "Low to High",
    field: "price" as SortField,
    direction: "asc" as SortDirection,
  },
  {
    label: "High to Low",
    field: "price" as SortField,
    direction: "desc" as SortDirection,
  },
  {
    label: "Most Recent",
    field: "date" as SortField,
    direction: "desc" as SortDirection,
  },
  {
    label: "Oldest First",
    field: "date" as SortField,
    direction: "asc" as SortDirection,
  },
];

export function ActivitySort({
  sortField,
  sortDirection,
  onSort,
  isMobile,
  isTablet,
}: ActivitySortProps) {
  const currentOption = sortOptions.find(
    (option) => option.field === sortField && option.direction === sortDirection
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "border-light_grey bg-true_black text-misty_white hover:bg-darkGray hover:text-misty_white hover:border-light_grey data-[state=open]:bg-darkGray data-[state=open]:text-misty_white",
            isMobile && "w-full justify-between touch-manipulation h-12",
            isTablet && "touch-manipulation"
          )}
        >
          <span className="text-misty_white">
            Price: {currentOption?.label || "Low to High"}
          </span>
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 text-misty_white",
              isMobile && "ml-auto"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-deepGray border-light_grey text-misty_white"
        align={isMobile ? "center" : "start"}
        sideOffset={isMobile ? 8 : 4}
      >
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={`${option.field}-${option.direction}`}
            onClick={() => onSort(option.field, option.direction)}
            className={cn(
              "text-misty_white hover:bg-darkGray hover:text-misty_white focus:bg-darkGray focus:text-misty_white cursor-pointer",
              isMobile && "touch-manipulation py-3"
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
