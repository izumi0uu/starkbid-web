import { useState, useEffect, useCallback } from 'react';
import { Owner, SortOption } from '@/types/owners.types';


const mockOwners: Owner[] = [
  {
    address: "0x239...6574",
    avatar: "/avatars/main-avatar.svg",
    username: "Cattle Negtar",
    isCreator: true,
    itemsOwned: 30,
    ownershipPercentage: 7,
    estimatedValue: {
      amount: "0.0287",
      currency: "ETH"
    },
    items: [
      { id: "1", name: "Item 1", image: "/1.png", tokenId: "1" },
      { id: "2", name: "Item 2", image: "/2.png", tokenId: "2" },
      { id: "3", name: "Item 3", image: "/3.png", tokenId: "3" },
      { id: "4", name: "Item 4", image: "/4.png", tokenId: "4" },
      { id: "5", name: "Item 5", image: "/5.png", tokenId: "5" },
    ]
  },
  {
    address: "0x123...4567",
    avatar: "/avatars/avatar-1.svg",
    username: "Matty Tash",
    isCreator: false,
    itemsOwned: 30,
    ownershipPercentage: 7,
    estimatedValue: {
      amount: "0.0287",
      currency: "ETH"
    },
    items: [
      { id: "6", name: "Item 6", image: "/6.png", tokenId: "6" },
      { id: "7", name: "Item 7", image: "/7.png", tokenId: "7" },
      { id: "8", name: "Item 8", image: "/8.png", tokenId: "8" },
      { id: "9", name: "Item 9", image: "/1.png", tokenId: "9" },
      { id: "10", name: "Item 10", image: "/2.png", tokenId: "10" },
    ]
  },
  {
    address: "0x789...0123",
    avatar: "/avatars/avatar-2.svg",
    username: "Benson Greffy",
    isCreator: false,
    itemsOwned: 30,
    ownershipPercentage: 7,
    estimatedValue: {
      amount: "0.0287",
      currency: "ETH"
    },
    items: [
      { id: "11", name: "Item 11", image: "/3.png", tokenId: "11" },
      { id: "12", name: "Item 12", image: "/4.png", tokenId: "12" },
      { id: "13", name: "Item 13", image: "/5.png", tokenId: "13" },
      { id: "14", name: "Item 14", image: "/6.png", tokenId: "14" },
      { id: "15", name: "Item 15", image: "/7.png", tokenId: "15" },
    ]
  },
  
  ...Array.from({ length: 9 }, (_, i) => ({
    address: `0x${(i + 4).toString().padStart(3, '0')}...${(i + 6574).toString()}`,
    avatar: `/avatars/avatar-${(i % 8) + 1}.svg`,
    username: "Benson Greffy",
    isCreator: false,
    itemsOwned: 30,
    ownershipPercentage: 7,
    estimatedValue: {
      amount: "0.0287",
      currency: "ETH" as const
    },
    items: Array.from({ length: 5 }, (_, j) => ({
      id: `${i * 5 + j + 16}`,
      name: `Item ${i * 5 + j + 16}`,
      image: `/${((i * 5 + j) % 8) + 1}.png`,
      tokenId: `${i * 5 + j + 16}`
    }))
  }))
];

export const useOwners = (
  collectionId: string,
  sortBy: SortOption,
  searchTerm: string
) => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const fetchOwners = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      
      const filteredOwners = mockOwners.filter(owner => 
        owner.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.address.toLowerCase().includes(searchTerm.toLowerCase())
      );

      
      switch (sortBy) {
        case 'mostOwned':
          filteredOwners.sort((a, b) => b.itemsOwned - a.itemsOwned);
          break;
        case 'highestValue':
          filteredOwners.sort((a, b) => parseFloat(b.estimatedValue.amount) - parseFloat(a.estimatedValue.amount));
          break;
        case 'alphabetical':
          filteredOwners.sort((a, b) => a.username.localeCompare(b.username));
          break;
        case 'recentActivity':
        
          filteredOwners.reverse();
          break;
      }

      const limit = 12;
      const startIndex = reset ? 0 : (cursor ? parseInt(cursor) : 0);
      const endIndex = startIndex + limit;
      const paginatedOwners = filteredOwners.slice(startIndex, endIndex);

      setOwners(prev => reset ? paginatedOwners : [...prev, ...paginatedOwners]);
      setCursor(endIndex.toString());
      setHasMore(endIndex < filteredOwners.length);
    } catch (err) {
      setError('Failed to load owners');
      console.error('Error fetching owners:', err);
    } finally {
      setLoading(false);
    }
  }, [sortBy, searchTerm, cursor]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchOwners(false);
    }
  }, [fetchOwners, loading, hasMore]);
  useEffect(() => {
    setCursor(null);
    setOwners([]);
    fetchOwners(true);
  }, [collectionId, sortBy, searchTerm, fetchOwners]);

  return {
    owners,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchOwners(true)
  };
};