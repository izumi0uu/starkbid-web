import React from 'react';

const CollectionStats: React.FC = () => {
  const stats = [
    { label: 'Total volume', value: '0.087 ETH', change: null },
    { label: 'Floor price', value: '0.059 ETH', change: null },
    { label: 'Best offer', value: '112.2 ETH', change: null },
    { label: 'Listed', value: '3.3K', change: null },
    { label: 'Owners', value: '1.25', change: null },
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
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionStats;