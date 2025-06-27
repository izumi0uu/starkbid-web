import React from 'react';

const CollectionStats: React.FC = () => {
  const stats = [
    { label: 'Floor Price', value: '0.087 ETH', change: null },
    { label: 'Top Offer', value: '0.099 ETH', change: null },
    { label: 'Volume', value: '112.2 ETH', change: null },
    { label: 'Total Assets', value: '3.2K', change: null },
    { label: 'Owners', value: '125', change: null },
  ];

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 bg-[#1C1D1F] rounded my-7">
      {/* Mobile: 2 columns, then 3 columns on sm, 5 columns on lg+ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`text-center ${
              // On mobile with 2 columns, center the last item if odd number of stats
              stats.length % 2 !== 0 && index === stats.length - 1 
                ? 'col-span-2 sm:col-span-1' 
                : ''
            }`}
          >
           
            <div className="text-xs sm:text-xl text-gray-400 mb-2">
              {stat.label}
            </div>
             <div className="text-lg sm:text-xl lg:text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionStats;