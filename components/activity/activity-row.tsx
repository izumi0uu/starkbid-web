"use client";

import type React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ActivityItem } from "@/types/activity";
import { TransactionBadge } from "./transaction-badge";
import { AddressDisplay } from "./address-display";
import { cn } from "@/lib/utils";

interface ActivityRowProps {
  activity: ActivityItem;
  onClick?: (activity: ActivityItem) => void;
  isTablet?: boolean;
}

export function ActivityRow({ activity, onClick, isTablet }: ActivityRowProps) {
  const handleRowClick = () => {
    onClick?.(activity);
  };

  const handleTransactionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://etherscan.io/tx/${activity.transactionHash}`,
      "_blank"
    );
  };

  const relativeTime = formatDistanceToNow(new Date(activity.timestamp), {
    addSuffix: true,
  });

  return (
    <TableRow
      className={cn(
        "border-light_grey hover:bg-darkGray/50 cursor-pointer transition-colors group",
        isTablet && "touch-manipulation"
      )}
      onClick={handleRowClick}
    >
      {/* Items */}
      <TableCell className="py-4">
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              "relative rounded-full overflow-hidden",
              isTablet ? "h-8 w-8" : "h-10 w-10"
            )}
          >
            <Image
              src={activity.nftImage || "/placeholder.svg"}
              alt={activity.nftName}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-misty_white font-medium truncate",
                isTablet ? "text-xs" : "text-sm"
              )}
            >
              {activity.nftName}
            </p>
            <p
              className={cn("text-soft_grey", isTablet ? "text-xs" : "text-xs")}
            >
              {activity.collectionNumber}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Transaction Type */}
      <TableCell className="py-4">
        <TransactionBadge
          type={activity.transactionType}
          className={isTablet ? "text-xs px-1.5 py-0.5" : ""}
        />
      </TableCell>

      {/* Price */}
      <TableCell className="py-4">
        <div
          className={cn(
            "text-misty_white font-medium",
            isTablet ? "text-xs" : "text-sm"
          )}
        >
          {activity.price.amount} {activity.price.currency}
        </div>
      </TableCell>

      {/* Collection Number */}
      <TableCell className="py-4">
        <span
          className={cn("text-soft_grey", isTablet ? "text-xs" : "text-sm")}
        >
          {activity.collectionNumber}
        </span>
      </TableCell>

      {/* Quantity */}
      <TableCell className="py-4">
        <span
          className={cn("text-soft_grey", isTablet ? "text-xs" : "text-sm")}
        >
          {activity.quantity}
        </span>
      </TableCell>

      {/* From */}
      <TableCell className="py-4">
        <AddressDisplay
          address={activity.from.address}
          displayName={activity.from.displayName}
          isTablet={isTablet}
        />
      </TableCell>

      {/* To */}
      <TableCell className="py-4">
        <AddressDisplay
          address={activity.to.address}
          displayName={activity.to.displayName}
          isTablet={isTablet}
        />
      </TableCell>

      {/* Date & Time */}
      <TableCell className="py-4">
        <div className="flex items-center justify-between">
          <span
            className={cn("text-soft_grey", isTablet ? "text-xs" : "text-sm")}
          >
            {relativeTime}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity hover:bg-darkGray text-soft_grey hover:text-misty_white",
              isTablet ? "h-5 w-5 touch-manipulation" : "h-6 w-6"
            )}
            onClick={handleTransactionClick}
          >
            <ExternalLink className={isTablet ? "h-3 w-3" : "h-3 w-3"} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
