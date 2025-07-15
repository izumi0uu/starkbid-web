import React, { useState } from 'react';
import Image from 'next/image';
// import userAvatar from '../../../public/creator_nft.png'; // Placeholder user avatar

interface PlaceBidModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlaceBidModal: React.FC<PlaceBidModalProps> = ({ isOpen, onClose }) => {
    // Move state declarations outside the conditional block
    const [bidAmount, setBidAmount] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('30 Days');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!isOpen) {
        return null;
    }

    // Dummy data for the modal - replace with actual data as needed
    const currentUser = {
        username: 'radicaldude84',
        address: '352By...fc76',
        isConnected: true,
        blockchain: 'Ethereum Blockchain',
        avatar: "/profileeth.png",
    };

    const currentNft = {
        name: 'OceanFrank#3001',
        blockchain: 'Ethereum',
        image: "/frank_ocean.png",
        collection: 'Jacksonito collection',
    };

    const bidDetails = {
        currentBid: '0.056 ETH',
        currentBidUsd: '$90',
        topOffer: '0.075 ETH',
        topOfferUsd: '$105',
        floorDifference: '0 WETH',
        starkBidFee: '0 WETH',
        creatorFee: '1.5%',
        totalOfferValueEth: '0 WETH',
        totalOfferValueUsd: '$0.00',
    };

    const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBidAmount(event.target.value);
    };

    const handleDurationSelect = (duration: string) => {
        setSelectedDuration(duration);
        setIsDropdownOpen(false);
    };

    const durations = ['7 Days', '30 Days', '90 Days'];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1C1D1F] p-6 rounded-2xl relative w-full max-w-md text-white">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Place a Bid</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>

                {/* User Info */}
                <div className="bg-[#29292A] rounded-lg p-4 mb-6 flex items-center gap-4">
                    <Image src={currentUser.avatar} alt="User Avatar" width={70} height={70} className="rounded-full" />
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">@{currentUser.username}</p>
                        </div>
                        <p className="text-gray-400 text-sm">{currentUser.address}</p>
                    </div>
                    <div className="ml-auto text-right flex flex-col gap-3">
                        <div>
                            {currentUser.isConnected && (
                                <span className="text-green-500 text-xs font-medium text-[#19B360] bg-[#2DCC7026] p-3 rounded-full">Connected</span>
                            )}
                        </div>
                        <span className="text-gray-400 text-sm">{currentUser.blockchain}</span>
                    </div>
                </div>

                {/* NFT Item Info */}
                <div className="flex items-center gap-4 mb-6">
                    <Image src={currentNft.image} alt="NFT Image" width={60} height={60} className="rounded-lg object-cover" />
                    <div>
                        <p className="font-semibold">{currentNft.name} • <span className="text-green-500 text-sm">{currentNft.blockchain}</span></p>
                        <p className="text-gray-400 text-sm">You are about to place a bid for {currentNft.name} from {currentNft.collection}</p>
                    </div>
                </div>

                {/* Bid Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-gray-400 text-sm">Current Bid Price</p>
                        <p className="text-xl font-semibold">{bidDetails.currentBid}</p>
                        <p className="text-gray-400 text-sm">{bidDetails.currentBidUsd}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-sm">Top Offer</p>
                        <p className="text-xl font-semibold">{bidDetails.topOffer}</p>
                        <p className="text-gray-400 text-sm">{bidDetails.topOfferUsd}</p>
                    </div>
                </div>

                {/* Bid Input */}
                <div className="mb-6">
                    <label htmlFor="bidPrice" className="block text-white font-semibold mb-2">Bid Price</label>
                    <div className="flex items-center bg-[#2A2B2F] rounded-lg p-3">
                        <input
                            id="bidPrice"
                            type="number"
                            placeholder="Enter price"
                            value={bidAmount}
                            onChange={handleBidChange}
                            className="bg-transparent outline-none w-full text-white"
                        />
                        <span className="text-gray-400">WETH</span>
                    </div>
                </div>

                {/* Fee Details */}
                <div className="space-y-3 text-gray-400 text-sm mb-6">
                    <div className="flex justify-between">
                        <span>Floor Difference</span>
                        <span>{bidDetails.floorDifference}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>StarkBid Fee</span>
                        <span>{bidDetails.starkBidFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Creator&apos;s Fee <span className="text-gray-500 text-xs">(i)</span></span>
                        <span>{bidDetails.creatorFee}</span>
                    </div>
                    <div className="border-t border-[#292929] pt-3 flex justify-between text-white font-semibold text-base">
                        <span>Total Offer Value</span>
                        <div className="text-right">
                            <p>{bidDetails.totalOfferValueEth}</p>
                            <p className="text-gray-400 text-sm font-normal">{bidDetails.totalOfferValueUsd}</p>
                        </div>
                    </div>
                </div>

                {/* Duration and Place Bid Button */}
                <div className="flex flex-col gap-4">
                    {/* Duration Dropdown */}
                    <div className="relative">
                        <button
                            className="flex justify-between items-center bg-[#2A2B2F] rounded-lg p-3 w-full text-white font-medium"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span>{selectedDuration}</span>
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute bottom-full mb-2 left-0 w-full bg-[#2A2B2F] rounded-lg shadow-lg overflow-hidden">
                                {durations.map((duration) => (
                                    <button
                                        key={duration}
                                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3A3B3F]"
                                        onClick={() => handleDurationSelect(duration)}
                                    >
                                        {duration}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Place Bid Button */}
                    <button className="bg-[#8C62F2] text-white py-3 rounded-lg font-semibold hover:bg-[#7A54E8] transition-colors">
                        Place a Bid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceBidModal;
