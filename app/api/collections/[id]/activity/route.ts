import { type NextRequest, NextResponse } from "next/server";
import { type ActivityItem, TransactionType } from "@/types/activity";

// Mock data generator
function generateMockActivity(id: string): ActivityItem {
  const types = Object.values(TransactionType);
  const names = [
    "Monkey Megga Mind",
    "Monkey On The Moon",
    "Monkey Mood",
    "Cyber Monkey",
    "Space Monkey",
    "Golden Monkey",
    "Diamond Monkey",
    "Rainbow Monkey",
  ];
  const users = ["Janice23", "KelvinT", "CryptoKing", "NFTLover", "MonkeyFan"];

  return {
    id,
    nftId: `nft-${id}`,
    nftName: names[Math.floor(Math.random() * names.length)],
    nftImage: `/collection2.png`,
    transactionType: types[Math.floor(Math.random() * types.length)],
    price: {
      amount: Number.parseFloat((Math.random() * 10).toFixed(3)),
      currency: "WETH",
    },
    collectionNumber: `#${Math.floor(Math.random() * 1000) + 1}`,
    quantity: 1,
    from: {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      displayName: users[Math.floor(Math.random() * users.length)],
    },
    to: {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      displayName: users[Math.floor(Math.random() * users.length)],
    },
    timestamp: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
  };
}

export async function GET(
  request: NextRequest
  // { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "20");
    const sort = searchParams.get("sort") || "date_desc";

    // Fix: Get all 'types' parameters (there can be multiple)
    const types = searchParams.getAll("types").filter(Boolean);

    const priceMin = searchParams.get("priceMin")
      ? Number.parseFloat(searchParams.get("priceMin")!)
      : null;
    const priceMax = searchParams.get("priceMax")
      ? Number.parseFloat(searchParams.get("priceMax")!)
      : null;
    const dateFrom = searchParams.get("dateFrom")
      ? new Date(searchParams.get("dateFrom")!)
      : null;
    const dateTo = searchParams.get("dateTo")
      ? new Date(searchParams.get("dateTo")!)
      : null;
    const users = searchParams.getAll("users").filter(Boolean);

    // Generate mock data
    const totalItems = 500;
    const allActivities: ActivityItem[] = [];

    for (let i = 0; i < totalItems; i++) {
      allActivities.push(generateMockActivity(`${i + 1}`));
    }

    // Apply filters
    let filteredActivities = allActivities;

    // Filter by transaction types - Fixed logic
    if (types.length > 0) {
      filteredActivities = filteredActivities.filter((activity) =>
        types.includes(activity.transactionType)
      );
    }

    // Filter by price range
    if (priceMin !== null) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.price.amount >= priceMin
      );
    }

    if (priceMax !== null) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.price.amount <= priceMax
      );
    }

    // Filter by date range
    if (dateFrom) {
      filteredActivities = filteredActivities.filter(
        (activity) => new Date(activity.timestamp) >= dateFrom
      );
    }

    if (dateTo) {
      const dateToEnd = new Date(dateTo);
      dateToEnd.setHours(23, 59, 59, 999);
      filteredActivities = filteredActivities.filter(
        (activity) => new Date(activity.timestamp) <= dateToEnd
      );
    }

    // Filter by users
    if (users.length > 0) {
      filteredActivities = filteredActivities.filter((activity) => {
        const fromMatch = users.some(
          (user) =>
            activity.from.address.toLowerCase().includes(user.toLowerCase()) ||
            activity.from.displayName
              ?.toLowerCase()
              .includes(user.toLowerCase())
        );
        const toMatch = users.some(
          (user) =>
            activity.to.address.toLowerCase().includes(user.toLowerCase()) ||
            activity.to.displayName?.toLowerCase().includes(user.toLowerCase())
        );
        return fromMatch || toMatch;
      });
    }

    // Apply sorting
    filteredActivities.sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return a.price.amount - b.price.amount;
        case "price_desc":
          return b.price.amount - a.price.amount;
        case "date_asc":
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        case "date_desc":
        default:
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedActivities = filteredActivities.slice(
      startIndex,
      startIndex + limit
    );

    return NextResponse.json({
      activities: paginatedActivities,
      total: filteredActivities.length,
      totalUnfiltered: totalItems,
      page,
      limit,
      totalPages: Math.ceil(filteredActivities.length / limit),
      appliedFilters: {
        types,
        priceMin,
        priceMax,
        dateFrom: dateFrom?.toISOString(),
        dateTo: dateTo?.toISOString(),
        users,
        sort,
      },
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
