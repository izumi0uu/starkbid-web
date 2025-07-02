import type { NextRequest } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { TransactionType } from "@/types/activity";

// Mock data for generating activities
const TRANSACTION_TYPES = Object.values(TransactionType);
const NFT_NAMES = [
  "Monkey Megga Mind",
  "Monkey On The Moon",
  "Monkey Mood",
  "Cyber Monkey",
  "Space Monkey",
  "Golden Monkey",
  "Diamond Monkey",
  "Rainbow Monkey",
];
const USER_NAMES = [
  "Janice23",
  "KelvinT",
  "CryptoKing",
  "NFTLover",
  "MonkeyFan",
];

let io: SocketIOServer;

function generateMockActivity(collectionId: string) {
  console.log(collectionId);
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

  return {
    id,
    nftId: `nft-${id}`,
    nftName: NFT_NAMES[Math.floor(Math.random() * NFT_NAMES.length)],
    nftImage: `/placeholder.svg?height=40&width=40`,
    transactionType:
      TRANSACTION_TYPES[Math.floor(Math.random() * TRANSACTION_TYPES.length)],
    price: {
      amount: Number.parseFloat((Math.random() * 10).toFixed(3)),
      currency: "WETH",
    },
    collectionNumber: `#${Math.floor(Math.random() * 1000) + 1}`,
    quantity: 1,
    from: {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      displayName: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)],
    },
    to: {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      displayName: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)],
    },
    timestamp: new Date().toISOString(),
    transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
  };
}

export async function GET(req: NextRequest) {
  console.log(req);
  if (!io) {
    const httpServer = new HTTPServer();

    io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("join-collection", (collectionId: string) => {
        socket.join(`collection-${collectionId}`);
        console.log(`Socket ${socket.id} joined collection: ${collectionId}`);
      });

      socket.on("leave-collection", (collectionId: string) => {
        socket.leave(`collection-${collectionId}`);
        console.log(`Socket ${socket.id} left collection: ${collectionId}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    // Generate mock activities every 10 seconds
    setInterval(() => {
      const rooms = io.sockets.adapter.rooms;

      rooms.forEach((sockets, room) => {
        if (room.startsWith("collection-")) {
          const collectionId = room.replace("collection-", "");
          const activity = generateMockActivity(collectionId);

          io.to(room).emit("new-activity", activity);
          console.log(`Sent activity to collection ${collectionId}`);
        }
      });
    }, 10000);

    const port = 3001;
    httpServer.listen(port, () => {
      console.log(`Socket.IO server running on port ${port}`);
    });
  }

  return new Response("Socket.IO server initialized", { status: 200 });
}
