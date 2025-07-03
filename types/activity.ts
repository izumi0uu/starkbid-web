export interface ActivityItem {
  id: string
  nftId: string
  nftName: string
  nftImage: string
  transactionType: TransactionType
  price: {
    amount: number
    currency: string
  }
  collectionNumber: string
  quantity: number
  from: {
    address: string
    displayName?: string
  }
  to: {
    address: string
    displayName?: string
  }
  timestamp: string
  transactionHash: string
  blockNumber?: number
}

export enum TransactionType {
  SALE = "Sales",
  TRANSFER = "Transfer",
  MINT = "Mint",
  LISTING = "Listing",
  OFFER = "Offers/Bids",
}

export interface ActivityFilters {
  transactionTypes: TransactionType[]
  priceRange: {
    min: number | null
    max: number | null
  }
  dateRange: {
    from: Date | null
    to: Date | null
  }
  users: string[]
}

export type SortField = "price" | "date"
export type SortDirection = "asc" | "desc"

export interface ActivityTabProps {
  collectionId: string
  isActive: boolean
}

export interface ActivityTableProps {
  activities: ActivityItem[]
  loading: boolean
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onActivityClick?: (activity: ActivityItem) => void
}
