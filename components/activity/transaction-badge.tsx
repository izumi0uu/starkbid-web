import { TransactionType } from "@/types/activity";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface TransactionBadgeProps {
  type: TransactionType;
  className?: string;
}

const badgeVariants = {
  [TransactionType.SALE]: "bg-blue-600 text-white",
  [TransactionType.TRANSFER]: "bg-gray-600 text-white",
  [TransactionType.MINT]: "bg-green text-white",
  [TransactionType.LISTING]: "bg-yellow-600 text-white",
  [TransactionType.OFFER]: "bg-purple text-white",
};

export function TransactionBadge({ type, className }: TransactionBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("text-xs font-medium", badgeVariants[type], className)}
    >
      {type}
    </Badge>
  );
}
