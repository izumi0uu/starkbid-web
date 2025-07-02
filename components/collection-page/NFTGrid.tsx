import React from "react";
import NFTCard from "./NFTCard";

interface NFTItem {
  id: string;
  name: string;
  price: string;
  image: string;
  backgroundColor: string;
  character: string;
  lastSale?: string;
  likes: number;
  timeLeft: string;
}

const NFTGrid: React.FC = () => {
  const nftItems: NFTItem[] = [
    {
      id: "1",
      name: "Monkey Megga Mind",
      price: "0.059 ETH",
      image: "/collection2.png",
      backgroundColor: "bg-blue-400",
      character: "🐵",
      lastSale: "0.059 ETH",
      likes: 626,
      timeLeft: "3d 14h left",
    },
    {
      id: "2",
      name: "Monkey On The Moon",
      price: "0.045 ETH",
      image: "/collection3.png",
      backgroundColor: "bg-gray-300",
      character: "🐵",
      likes: 423,
      timeLeft: "2d 8h left",
    },
    {
      id: "3",
      name: "Monkey Mood",
      price: "0.067 ETH",
      image: "/collection4.png",
      backgroundColor: "bg-red-500",
      character: "🐵",
      likes: 789,
      timeLeft: "4d 22h left",
    },
    {
      id: "4",
      name: "Monkey Mode",
      price: "0.052 ETH",
      image: "/collection5.png",
      backgroundColor: "bg-orange-400",
      character: "🐵",
      likes: 341,
      timeLeft: "1d 6h left",
    },
    {
      id: "5",
      name: "Monkey Mode",
      price: "0.078 ETH",
      image: "/collection6.png",
      backgroundColor: "bg-pink-300",
      character: "🐵",
      likes: 892,
      timeLeft: "5d 17h left",
    },
    {
      id: "6",
      name: "Monkey Mode",
      price: "0.041 ETH",
      image: "/collection7.png",
      backgroundColor: "bg-purple-400",
      character: "🐵",
      likes: 256,
      timeLeft: "2d 11h left",
    },
    {
      id: "7",
      name: "Monkey Mode",
      price: "0.063 ETH",
      image: "/collection8.png",
      backgroundColor: "bg-purple-500",
      character: "🐵",
      likes: 567,
      timeLeft: "3d 19h left",
    },
    {
      id: "8",
      name: "Monkey Mode",
      price: "0.055 ETH",
      image: "/collection2.png",
      backgroundColor: "bg-green-400",
      character: "🐵",
      likes: 445,
      timeLeft: "4d 2h left",
    },
    {
      id: "9",
      name: "Monkey Mode",
      price: "0.072 ETH",
      image: "/collection10.png",
      backgroundColor: "bg-cyan-400",
      character: "🐵",
      likes: 712,
      timeLeft: "1d 15h left",
    },
    {
      id: "10",
      name: "Monkey Mode",
      price: "0.048 ETH",
      image: "/collection1.png",
      backgroundColor: "bg-yellow-400",
      character: "🐵",
      likes: 334,
      timeLeft: "3d 7h left",
    },
    {
      id: "11",
      name: "Monkey Mode",
      price: "0.066 ETH",
      image: "/collection12.png",
      backgroundColor: "bg-gray-600",
      character: "🐵",
      likes: 678,
      timeLeft: "2d 23h left",
    },
    {
      id: "12",
      name: "Monkey Mode",
      price: "0.053 ETH",
      image: "/collection13.png",
      backgroundColor: "bg-orange-500",
      character: "🐵",
      likes: 389,
      timeLeft: "4d 12h left",
    },
    {
      id: "13",
      name: "Monkey Mode",
      price: "0.074 ETH",
      image: "/collection14.png",
      backgroundColor: "bg-purple-600",
      character: "🐵",
      likes: 823,
      timeLeft: "5d 3h left",
    },
    {
      id: "14",
      name: "Monkey Mode",
      price: "0.061 ETH",
      image: "/collection15.png",
      backgroundColor: "bg-green-500",
      character: "🐵",
      likes: 456,
      timeLeft: "1d 18h left",
    },
    {
      id: "15",
      name: "Monkey Mode",
      price: "0.049 ETH",
      image: "/collection4.png",
      backgroundColor: "bg-teal-400",
      character: "🐵",
      likes: 234,
      timeLeft: "3d 9h left",
    },
    {
      id: "16",
      name: "Monkey Mode",
      price: "0.058 ETH",
      image: "/collection1.png",
      backgroundColor: "bg-yellow-500",
      character: "🐵",
      likes: 567,
      timeLeft: "2d 16h left",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 grid-rows-3 xl:grid-cols-4 gap-x-6 gap-y-10 py-6 min-h-screen">
      {nftItems.map((item) => (
        <NFTCard
          key={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          likes={item.likes}
          minted="24"
          timeLeft={item.timeLeft} 
          creatorName="MonkeyMan (もりうさ)"
          creatorIcon="/collectionProfile.png"
          isVerified={true}
          lastSale={item.lastSale}
        />
      ))}
    </div>
  );
};

export default NFTGrid;