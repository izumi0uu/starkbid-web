export interface Owner {
  address: string;
  avatar: string;
  username: string;
  isCreator: boolean;
  isVerified?: boolean;
  itemsOwned: number;
  ownershipPercentage: number;
  estimatedValue: {
    amount: string;
    currency: 'ETH' | 'WETH' | 'USD';
  };
  items: OwnerItem[];
  joinDate?: Date;
  lastActivity?: Date;
}

export interface OwnerItem {
  id: string;
  name: string;
  image: string;
  tokenId: string;
}

export type SortOption = 
  | 'mostOwned' 
  | 'highestValue' 
  | 'recentActivity' 
  | 'alphabetical';
