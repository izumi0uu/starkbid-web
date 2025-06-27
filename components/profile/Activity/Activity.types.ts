export interface ActivityItem {
    id: string;
    itemName: string;
    itemImage: string;
    transactionType: 'Sales' | 'Transfer' | 'Mint' | 'Listing' | 'Offers/Bids';
    price: number;
    currency: string;
    collectionNumber: string;
    qty: number;
    from: string;
    to: string;
    date: string;
    timeAgo: string;
    isVerified?: boolean;
}