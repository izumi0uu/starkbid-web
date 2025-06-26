


import React from 'react';
import { User, Heart } from 'lucide-react';
import Image from 'next/image';

interface NFTItem {
  id: string;
  name: string;
  price: string;
  image: string;
  backgroundColor: string;
  character: string;
  lastSale?: string;
}

const NFTGrid: React.FC = () => {
  // Mock data matching the original structure
  const nftItems: NFTItem[] = [
    { id: '1', name: 'MonkeyMart #4870', price: '0.059 ETH', image: '/collection2.png', backgroundColor: 'bg-blue-400', character: '🐵', lastSale: '0.059 ETH' },
    { id: '2', name: 'MonkeyMart #4871', price: '0.045 ETH', image: '/collection3.png', backgroundColor: 'bg-gray-300', character: '🐵' },
    { id: '3', name: 'MonkeyMart #4872', price: '0.067 ETH', image: '/collection4.png', backgroundColor: 'bg-red-500', character: '🐵' },
    { id: '4', name: 'MonkeyMart #4873', price: '0.052 ETH', image: '/collection5.png', backgroundColor: 'bg-orange-400', character: '🐵' },
    { id: '5', name: 'MonkeyMart #4874', price: '0.078 ETH', image: '/collection6.png', backgroundColor: 'bg-pink-300', character: '🐵' },
    { id: '6', name: 'MonkeyMart #4875', price: '0.041 ETH', image: '/collection7.png', backgroundColor: 'bg-purple-400', character: '🐵' },
    { id: '7', name: 'MonkeyMart #4876', price: '0.063 ETH', image: '/collection8.png', backgroundColor: 'bg-purple-500', character: '🐵' },
    { id: '8', name: 'MonkeyMart #4877', price: '0.055 ETH', image: '/collection2.png', backgroundColor: 'bg-green-400', character: '🐵' },
    { id: '9', name: 'MonkeyMart #4878', price: '0.072 ETH', image: '/collection10.png', backgroundColor: 'bg-cyan-400', character: '🐵' },
    { id: '10', name: 'MonkeyMart #4879', price: '0.048 ETH', image: '/collection1.png', backgroundColor: 'bg-yellow-400', character: '🐵' },
    { id: '11', name: 'MonkeyMart #4880', price: '0.066 ETH', image: '/collection12.png', backgroundColor: 'bg-gray-600', character: '🐵' },
    { id: '12', name: 'MonkeyMart #4881', price: '0.053 ETH', image: '/collection13.png', backgroundColor: 'bg-orange-500', character: '🐵' },
    { id: '13', name: 'MonkeyMart #4882', price: '0.074 ETH', image: '/collection14.png', backgroundColor: 'bg-purple-600', character: '🐵' },
    { id: '14', name: 'MonkeyMart #4883', price: '0.061 ETH', image: '/collection15.png', backgroundColor: 'bg-green-500', character: '🐵' },
    { id: '15', name: 'MonkeyMart #4884', price: '0.049 ETH', image: '/collection4.png', backgroundColor: 'bg-teal-400', character: '🐵' },
    { id: '16', name: 'MonkeyMart #4885', price: '0.058 ETH', image: '/collection1.png', backgroundColor: 'bg-yellow-500', character: '🐵' },
  ];

  

  const getRandomLikes = () => Math.floor(Math.random() * 1000) + 100;
  const getRandomTimeLeft = () => {
    const days = Math.floor(Math.random() * 5) + 1;
    const hours = Math.floor(Math.random() * 24);
    return `${days}d ${hours}h left`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6 bg-black min-h-screen">
      {nftItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-900 border border-gray-600 rounded-2xl md:w-96 p-3 h-[453px] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer hover:scale-105"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-medium text-sm">MonkeyMan</span>
              <span className="text-gray-400 text-xs">(もりうさ)</span>
              <div className="w-3 h-3 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
          </div>

          {/* NFT Image */}
          <div className={`h-72 flex items-center justify-center relative`}>
            <Image src={item.image} width={500} height={300} alt='' className='w-full h-full'/>
            {item.lastSale && (
              <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                Last sale {item.lastSale}
              </div>
            )}
          </div>

          {/* Card Details */}
          <div className="p-4">
            <h3 className="text-white text-lg font-bold mb-3">{item.name}</h3>
            
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm">Current Bid</div>
                <div className="text-white font-bold text-lg">{item.price}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">{getRandomLikes()} likes</div>
                <div className="text-gray-300 text-xs">24 minted | {getRandomTimeLeft()}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTGrid;