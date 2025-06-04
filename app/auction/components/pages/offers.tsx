// components/pages/OffersPage.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import verifiedicon from "../../../../public/verified.png";
import user1 from '../../../../public/creator_nft.png'; // Replace with actual avatar paths
import user2 from '../../../../public/creator_nft.png';
import user3 from '../../../../public/creator_nft.png';
import user4 from '../../../../public/creator_nft.png';
import { StaticImageData } from 'next/image';

type Offer = {
    id: number;
    user: string;
    avatar: StaticImageData;
    isVerified: boolean;
    amount: string;
    usdAmount: string;
    time: string;
};

const OffersPage = () => {
    const [showAllOffers, setShowAllOffers] = useState(false); // State to control how many offers are shown
    const [isOffersOpen, setIsOffersOpen] = useState(true); // State to control the collapse/expand of the section

    const allOffers: Offer[] = [
        {
            id: 1,
            user: "0x123...456",
            avatar: user1,
            isVerified: true,
            amount: "1.25 ETH",
            usdAmount: "$3,250",
            time: "2 hours ago"
        },
        {
            id: 2,
            user: "0x789...012",
            avatar: user2,
            isVerified: true,
            amount: "1.00 ETH",
            usdAmount: "$2,600",
            time: "1 day ago"
        },
        {
            id: 3,
            user: "0x456...789",
            avatar: user3,
            isVerified: false,
            amount: "0.85 ETH",
            usdAmount: "$2,210",
            time: "2 days ago"
        },
        {
            id: 4,
            user: "0xabc...def",
            avatar: user4,
            isVerified: true,
            amount: "0.75 ETH",
            usdAmount: "$1,950",
            time: "3 days ago"
        },
        {
            id: 5,
            user: "0x111...222",
            avatar: user1,
            isVerified: false,
            amount: "0.70 ETH",
            usdAmount: "$1,820",
            time: "4 days ago"
        },
         {
            id: 6,
            user: "0x333...444",
            avatar: user2,
            isVerified: true,
            amount: "0.65 ETH",
            usdAmount: "$1,690",
            time: "5 days ago"
        },
         {
            id: 7,
            user: "0x555...666",
            avatar: user3,
            isVerified: false,
            amount: "0.60 ETH",
            usdAmount: "$1,560",
            time: "6 days ago"
        },
         {
            id: 8,
            user: "0x777...888",
            avatar: user4,
            isVerified: true,
            amount: "0.55 ETH",
            usdAmount: "$1,430",
            time: "1 week ago"
        }
    ];

    const offersToShow = showAllOffers ? allOffers : allOffers.slice(0, 4);

    return (
        <div className="bg-[#1C1D1F] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={() => setIsOffersOpen(!isOffersOpen)}>
                 <h3 className="text-white text-lg font-semibold">Offers/Bids</h3>
                 <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOffersOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
            </div>
            
            {isOffersOpen && (
                 <>
                    {allOffers.length > 0 ? (
                        <div className="space-y-4">
                            {offersToShow.map((offer) => (
                                <div key={offer.id} className="flex items-center justify-between p-4 bg-[#2A2B2F] rounded-lg hover:bg-[#323437] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#3A3B3F] rounded-full flex items-center justify-center">
                                            <Image 
                                                src={offer.avatar} 
                                                alt={offer.user} 
                                                width={40} 
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-medium">{offer.user}</p>
                                                {offer.isVerified && (
                                                    <Image src={verifiedicon} alt="verified" width={16} height={16} />
                                                )}
                                            </div>
                                            <p className="text-gray-400 text-sm">{offer.time}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                        <p className="text-white font-semibold">{offer.amount}</p>
                                        <p className="text-gray-400 text-sm">{offer.usdAmount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 bg-[#2A2B2F] rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 3l18 18"
                                    />
                                </svg>
                            </div>

                            <h4 className="text-gray-300 text-base font-medium mb-2">
                                No offers/bids placed yet.
                            </h4>
                            <p className="text-gray-500 text-sm">
                                Make your first bid here!
                            </p>
                        </div>
                    )}
                    {allOffers.length > 4 && (
                         <div className="mt-6 text-center">
                            <button 
                                onClick={() => setShowAllOffers(!showAllOffers)}
                                className="text-[#8C62F2] hover:text-[#7A54E8] font-medium text-sm transition-colors"
                            >
                                {showAllOffers ? 'Show Less Offers' : 'View All Offers'}
                            </button>
                        </div>
                    )}
                 </>
            )}
        </div>
    );
};

export default OffersPage;