"use client";

import type React from "react";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AddressDisplayProps {
  address: string;
  displayName?: string;
  className?: string;
  isTablet?: boolean;
  isMobile?: boolean;
}

export function AddressDisplay({
  address,
  displayName,
  className,
  isTablet,
  isMobile,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const truncatedAddress = isMobile
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : `${address.slice(0, 4)}...${address.slice(-4)}`;

  const displayText = displayName || truncatedAddress;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-1 group", className)}>
            <span
              className={cn(
                "text-soft_grey hover:text-misty_white cursor-pointer transition-colors",
                isTablet && "text-xs",
                isMobile && "text-sm"
              )}
            >
              {displayText}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity hover:bg-darkGray text-soft_grey hover:text-misty_white",
                isTablet && "h-4 w-4 touch-manipulation",
                isMobile && "h-5 w-5 touch-manipulation",
                !isTablet && !isMobile && "h-4 w-4"
              )}
              onClick={handleCopy}
            >
              {copied ? (
                <Check
                  className={cn(
                    "text-green-500",
                    isTablet && "h-3 w-3",
                    isMobile && "h-3 w-3",
                    !isTablet && !isMobile && "h-3 w-3"
                  )}
                />
              ) : (
                <Copy
                  className={cn(
                    "text-soft_grey group-hover:text-misty_white",
                    isTablet && "h-3 w-3",
                    isMobile && "h-3 w-3",
                    !isTablet && !isMobile && "h-3 w-3"
                  )}
                />
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-darkerGray border-light_grey text-misty_white">
          <p className="text-xs text-misty_white">{address}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
