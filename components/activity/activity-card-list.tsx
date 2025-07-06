"use client";

import type React from "react";
import { useRef } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ActivityItem } from "@/types/activity";
import { TransactionBadge } from "./transaction-badge";
import { AddressDisplay } from "./address-display";

// Types
interface ActivityCardListProps {
  activities: ActivityItem[];
  loading: boolean;
  onActivityClick?: (activity: ActivityItem) => void;
}

interface ActivityCardProps {
  activity: ActivityItem;
  onClick?: (activity: ActivityItem) => void;
}

// Custom hook for swipe gestures
function useSwipeGesture(cardRef: React.RefObject<HTMLDivElement | null>) {
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !cardRef.current) return;

    currentX.current = e.touches[0].clientX;
    const diffX = currentX.current - startX.current;
    const clampedDiff = Math.max(-100, Math.min(100, diffX));

    cardRef.current.style.transform = `translateX(${clampedDiff}px)`;
    cardRef.current.style.opacity = `${1 - Math.abs(diffX) / 200}`;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || !cardRef.current) return;

    isDragging.current = false;
    const diffX = currentX.current - startX.current;
    const isSwipeThreshold = Math.abs(diffX) > 50;

    if (isSwipeThreshold) {
      const direction = diffX > 0 ? "100%" : "-100%";
      cardRef.current.style.transform = `translateX(${direction})`;
      cardRef.current.style.opacity = "0";

      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transform = "translateX(0)";
          cardRef.current.style.opacity = "1";
        }
      }, 300);
    } else {
      cardRef.current.style.transform = "translateX(0)";
      cardRef.current.style.opacity = "1";
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}

// Activity Card Component
function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeGesture(cardRef);

  const relativeTime = formatDistanceToNow(new Date(activity.timestamp), {
    addSuffix: true,
  });

  const handleCardClick = () => onClick?.(activity);

  const handleTransactionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://etherscan.io/tx/${activity.transactionHash}`,
      "_blank"
    );
  };

  return (
    <Card
      ref={cardRef}
      className="bg-deepGray dark:bg-deepGray border-light_grey cursor-pointer hover:bg-darkGray transition-all duration-200 touch-manipulation"
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={activity.nftImage || "/placeholder.svg"}
                alt={activity.nftName}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-misty_white font-medium text-sm truncate">
                {activity.nftName}
              </CardTitle>
              <CardDescription className="text-soft_grey text-xs">
                {activity.collectionNumber}
              </CardDescription>
            </div>
          </div>
          <TransactionBadge
            type={activity.transactionType}
            className="flex-shrink-0"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Price & Quantity */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-soft_grey">Price</p>
            <p className="text-misty_white font-medium">
              {activity.price.amount} {activity.price.currency}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-soft_grey">QTY</p>
            <p className="text-misty_white font-medium">{activity.quantity}</p>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-soft_grey">From</span>
            <AddressDisplay
              address={activity.from.address}
              displayName={activity.from.displayName}
              isMobile={true}
            />
          </div>
          <div className="flex items-center justify-center text-soft_grey">
            <ArrowRight className="h-3 w-3" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-soft_grey">To</span>
            <AddressDisplay
              address={activity.to.address}
              displayName={activity.to.displayName}
              isMobile={true}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2 border-t border-light_grey">
        <span className="text-xs text-soft_grey">{relativeTime}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 touch-manipulation hover:bg-darkGray text-soft_grey hover:text-misty_white"
          onClick={handleTransactionClick}
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// Loading Skeleton Component
function ActivityCardSkeleton() {
  return (
    <Card className="bg-deepGray dark:bg-deepGray border-light_grey">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Skeleton className="h-12 w-12 rounded-full bg-darkerGray dark:bg-darkerGray" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-32 bg-darkerGray dark:bg-darkerGray" />
              <Skeleton className="h-3 w-16 bg-darkerGray dark:bg-darkerGray" />
            </div>
          </div>
          <Skeleton className="h-6 w-16 bg-darkerGray dark:bg-darkerGray" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-3 w-8 bg-darkerGray dark:bg-darkerGray" />
            <Skeleton className="h-4 w-20 bg-darkerGray dark:bg-darkerGray" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-8 bg-darkerGray dark:bg-darkerGray" />
            <Skeleton className="h-4 w-8 bg-darkerGray dark:bg-darkerGray" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-8 bg-darkerGray dark:bg-darkerGray" />
            <Skeleton className="h-4 w-20 bg-darkerGray dark:bg-darkerGray" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-8 bg-darkerGray dark:bg-darkerGray" />
            <Skeleton className="h-4 w-20 bg-darkerGray dark:bg-darkerGray" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <Skeleton className="h-3 w-24 bg-darkerGray dark:bg-darkerGray" />
        <Skeleton className="h-8 w-8 bg-darkerGray dark:bg-darkerGray" />
      </CardFooter>
    </Card>
  );
}

// Main Component
export function ActivityCardList({
  activities,
  loading,
  onActivityClick,
}: ActivityCardListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }, (_, index) => (
          <ActivityCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-soft_grey">
          No activities found for this collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onClick={onActivityClick}
        />
      ))}
    </div>
  );
}
