"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  from?: Date | null;
  to?: Date | null;
  onSelect?: (range: DateRange | undefined) => void;
  isMobile?: boolean;
  className?: string;
}

export function DatePickerWithRange({
  from,
  to,
  onSelect,
  isMobile,
  className,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from || undefined,
    to: to || undefined,
  });

  React.useEffect(() => {
    setDate({ from: from || undefined, to: to || undefined });
  }, [from, to]);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    onSelect?.(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal bg-darkerGray border-light_grey text-misty_white hover:bg-darkGray hover:text-misty_white hover:border-light_grey",
              !date && "text-soft_grey",
              isMobile && "touch-manipulation h-12"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-misty_white" />
            <span className="text-misty_white">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                "Pick a date range"
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-deepGray border-light-grey"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : 2}
            className="text-misty-white"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
