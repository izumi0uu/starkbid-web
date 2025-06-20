// components/pages/ActivityPage.tsx
import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Image from 'next/image';
import user1 from '../../../../public/creator_nft.png'; // Replace with actual avatar paths
import user2 from '../../../../public/creator_nft.png';
import user3 from '../../../../public/creator_nft.png';
import user4 from '../../../../public/creator_nft.png';
import { StaticImageData } from 'next/image';
import { TooltipItem } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Activity = {
    id: number;
    type: 'Sale' | 'Listing' | 'Transfer' | 'Mint' | 'Bid';
    user: string;
    userAvatar: StaticImageData;
    details: string;
    time: string;
    priceEth?: string;
    priceUsd?: string;
};

const ActivityPage = () => {
    const [showChart, setShowChart] = useState(true); // State to control chart visibility
    const [showActivityLog, setShowActivityLog] = useState(true); // State to control activity log visibility
    const [showAllActivity, setShowAllActivity] = useState(false); // State to control how many activities are shown

    const allActivities: Activity[] = [
        {
            id: 1,
            type: 'Sale',
            user: 'x0023y...yrte',
            userAvatar: user1,
            details: 'sold to x07056...jure',
            time: '20 minutes ago',
            priceEth: '0.060 ETH',
            priceUsd: '$101',
        },
        {
            id: 2,
            type: 'Listing',
            user: 'x0023y...yrte',
            userAvatar: user2,
            details: 'listed for',
            time: '1 hour ago',
            priceEth: '0.060 ETH',
            priceUsd: '$101',
        },
        {
            id: 3,
            type: 'Transfer',
            user: 'x0023y...yrte',
            userAvatar: user3,
            details: 'transferred to x07056...jure',
            time: '2 days ago',
            priceEth: '0.060 ETH',
            priceUsd: '$101',
        },
        {
            id: 4,
            type: 'Mint',
            user: 'x0023y...yrte',
            userAvatar: user4,
            details: '',
            time: '4 days ago',
            priceEth: '0.060 ETH',
            priceUsd: '$101',
        },
         {
            id: 5,
            type: 'Bid',
            user: 'x0abc...def',
            userAvatar: user1,
            details: 'placed bid',
            time: '1 day ago',
            priceEth: '0.050 ETH',
            priceUsd: '$85',
        },
         {
            id: 6,
            type: 'Sale',
            user: 'x0123...456',
            userAvatar: user2,
            details: 'sold to x0789...012',
            time: '5 days ago',
            priceEth: '0.070 ETH',
            priceUsd: '$120',
        },
         {
            id: 7,
            type: 'Listing',
            user: 'x0def...789',
            userAvatar: user3,
            details: 'listed for',
            time: '1 week ago',
            priceEth: '0.065 ETH',
            priceUsd: '$110',
        },
         {
            id: 8,
            type: 'Transfer',
            user: 'x0fed...cba',
            userAvatar: user4,
            details: 'transferred to x0345...678',
            time: '1 week ago',
            priceEth: '0.060 ETH',
            priceUsd: '$101',
        },
    ];

    const activitiesToShow = showAllActivity ? allActivities : allActivities.slice(0, 4);

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Price',
                data: [3, 4, 2, 1, 0.5, 7, 4, 5, 3, 4, 5, 4],
                backgroundColor: '#8C62F2',
                borderRadius: 8,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow chart to span full width
        plugins: {
            legend: {
                display: false, // Hide legend as per UI
            },
            title: {
                display: true,
                text: 'Price History', // Changed title
                color: '#fff',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context: TooltipItem<'bar'>) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (typeof context.raw === 'number') {
                            label += `${context.raw.toFixed(2)} ETH`;
                        } else if (context.raw !== null) {
                            label += `${context.raw} ETH`;
                        }
                        return label;
                    },
                    title: function(context: TooltipItem<'bar'>[]) {
                        const date = new Date(2025, context[0].dataIndex, 15); // Assuming the 15th of each month in 2025
                        return date.toLocaleDateString();
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#292929'
                },
                ticks: {
                    color: '#fff'
                }
            },
            x: {
                grid: {
                    color: '#292929'
                },
                ticks: {
                    color: '#fff'
                }
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Activity Log */}
            <div className="bg-[#1C1D1F] rounded-lg p-6 lg:w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-lg font-semibold">Activity Log</h3>
                    <button
                        onClick={() => setShowActivityLog(!showActivityLog)}
                        className="text-gray-400 hover:text-white transition-transform duration-200"
                    >
                         <svg
                            className={`w-5 h-5 transition-transform duration-200 ${showActivityLog ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </button>
                </div>
                {showActivityLog && (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-3 text-gray-400 text-sm font-medium border-b border-[#292929] pb-3 mb-4">
                            <div>Users</div>
                            <div className="text-center">Transaction Type</div>
                            <div className="text-right">Price</div>
                        </div>

                        {/* Activity List */}
                        <div className="space-y-4">
                            {activitiesToShow.map((activity) => (
                                <div key={activity.id} className="grid grid-cols-3 items-center p-4 bg-[#2A2B2F] rounded-lg hover:bg-[#323437] transition-colors">
                                    {/* User Info */}
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={activity.userAvatar}
                                            alt={activity.user}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <p className="text-white font-medium">{activity.user} <span className="text-gray-400">{activity.details}</span></p>
                                            <p className="text-gray-400 text-sm">{activity.time}</p>
                                        </div>
                                    </div>

                                    {/* Transaction Type */}
                                    <div className="text-center text-white font-medium">
                                        {activity.type}
                                    </div>

                                    {/* Price */}
                                     {activity.priceEth && activity.priceUsd && (
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{activity.priceEth}</p>
                                            <p className="text-gray-400 text-sm">{activity.priceUsd}</p>
                                        </div>
                                     )}
                                </div>
                            ))}
                        </div>

                        {allActivities.length > 4 && (
                             <div className="mt-6 text-center">
                                <button
                                    onClick={() => setShowAllActivity(!showAllActivity)}
                                    className="text-[#8C62F2] hover:text-[#7A54E8] font-medium text-sm transition-colors"
                                >
                                    {showAllActivity ? 'Show Less Activity' : 'View All Activity'}
                                </button>
                            </div>
                        )}
                    </>
                 )}
            </div>

            {/* Price History Chart */}
            <div className="bg-[#1C1D1F] rounded-lg p-6 lg:w-1/2">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-lg font-semibold">Price History</h3>
                     <button
                        onClick={() => setShowChart(!showChart)}
                        className="text-gray-400 hover:text-white transition-transform duration-200"
                     >
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 ${showChart ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </button>
                 </div>
                 {showChart && (
                     <div className="w-full h-64 md:h-80">
                         <Bar options={chartOptions} data={chartData} />
                     </div>
                 )}
            </div>
        </div>
    );
};

export default ActivityPage;
