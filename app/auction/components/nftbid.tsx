// nftbid.tsx
'use client'
import { useState } from "react";
import Image from "next/image";
import frank_nft from "../../../public/frank_ocean.png";
import jacknft from "../../../public/jack-icon.png";
import verifiedicon from "../../../public/verified.png";
import likeicon from "../../../public/like-icon.png";
import creator from "../../../public/creator_nft.png"
import owner from "../../../public/new_owner.png"
import right_arrow from "../../../public/right-arrow.png"
import share from "../../../public/share.png"
import web from "../../../public/web.png"

// Import the page components
import DescriptionPage from "./pages/description";
import OffersPage from "./pages/offers";
import ActivityPage from "./pages/activity";

// Import the modal component
import PlaceBidModal from "./PlaceBidModal";

const NftBid = () => {
    const [activeTab, setActiveTab] = useState('description');
    const [showShareModal, setShowShareModal] = useState(false);
    const [showPlaceBidModal, setShowPlaceBidModal] = useState(false); // State for Place Bid modal

    const renderPage = () => {
        switch (activeTab) {
            case 'description':
                return <DescriptionPage />;
            case 'offers':
                return <OffersPage />;
            case 'activity':
                return <ActivityPage />;
            default:
                return <DescriptionPage />;
        }
    };

    return (
        <div>
            {/* share button modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1C1D1F] p-4 sm:p-8 rounded-2xl relative w-full max-w-[500px]">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl"
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-white mb-6">Share Asset</h2>

                            {/* Profile Avatar */}
                            <div className="flex justify-center"><Image src={jacknft} alt="" width={60} height={60} /></div>

                            {/* Username with checkmark */}
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-gray-300 text-sm">Jacksonito</span>
                                <Image src={verifiedicon} alt="nftplaceholder" width={20} height={20} />
                            </div>

                            {/* Asset Name */}
                            <h3 className="text-white text-xl font-medium">OceanFrank#3001</h3>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex justify-center gap-4 mb-8">
                            <button className="w-12 h-12 bg-[#3A3D45] rounded-xl hover:bg-[#434750] flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                            <button className="w-12 h-12 bg-[#3A3D45] rounded-xl hover:bg-[#434750] flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </button>
                            <button className="w-12 h-12 bg-[#3A3D45] rounded-xl hover:bg-[#434750] flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </button>
                            <button className="w-12 h-12 bg-[#3A3D45] rounded-xl hover:bg-[#434750] flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </button>
                            <button className="w-12 h-12 bg-[#3A3D45] rounded-xl hover:bg-[#434750] flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm6.5 11.5h-13a6.5 6.5 0 0 1 13 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* URL Input with Copy Button */}
                        <div className="flex items-center gap-3 mb-6 bg-[#29292A] pr-3 rounded-lg">
                            <div className="flex-1 rounded-lg px-4 py-3 text-sm text-gray-300">
                                https://starkbid.com/token/0xef0cd0f1362ee213c9f6a
                            </div>
                            <button className="bg-[#1C1D1F] hover:bg-[#434750] px-3 py-2 rounded-lg text-white text-sm transition-colors flex items-center gap-2">
                                <span>Copy</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            </button>
                        </div>

                        {/* Close and Continue Button */}
                        <button className="w-full bg-[#8C62F2] text-white py-4 rounded-xl font-medium transition-all duration-200">
                            Close and Continue
                        </button>
                    </div>
                </div>
            )}
            {/* share button modal ends */}

            {/* Place Bid Modal */}
            <PlaceBidModal 
                isOpen={showPlaceBidModal} 
                onClose={() => setShowPlaceBidModal(false)} 
            />

            <div className="px-4 sm:px-6 md:px-[10%] gap-4 md:gap-20 pt-6 md:pt-10 flex flex-col lg:flex-row items-start">
                <div className="w-full lg:basis-[50%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[638px]">
                    <Image
                        src={frank_nft}
                        alt="frant_ocean_nft"
                        width={300}
                        height={600}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-full lg:basis-[50%] mt-6 lg:mt-0">
                <div className="flex justify-between basis-[50%]">
                    <div className="flex items-center gap-2">
                        <Image src={jacknft} alt="nftplaceholder" width={40} height={40} />
                        <p>Jacksonito</p>
                        <Image src={verifiedicon} alt="nftplaceholder" width={20} height={20} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Image src={likeicon} alt="likeicon" width={30} height={30} />
                        <p>56</p>
                    </div>
                </div>

                    <p className="text-white text-2xl md:text-3xl font-bold tracking-wide py-4 md:py-6">OceanFrank#3001</p>

                    <div className="flex flex-col sm:flex-row justify-between bg-[#1C1D1F] rounded-lg p-4 gap-4">
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-400 text-sm">Current Bid Price</p>
                            <p className="text-xl md:text-2xl font-semibold">0.023 ETH</p>
                        <p className="text-gray-400 text-sm">$90</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-gray-400 text-sm">Top Offer</p>
                            <p className="text-xl md:text-2xl font-semibold">1.23 ETH</p>
                        <p className="text-gray-400 text-sm">$290</p>
                    </div>
                </div>

                    <p className="text-sm text-gray-400 flex justify-center py-4 md:py-6"><span>Sales deadline | </span> 1d 9h left</p>

                    <div className="flex flex-col sm:flex-row justify-between items-center border-y py-4 md:py-6 border-[#292929] gap-4">
                        <div className="flex items-center gap-4 md:gap-6">
                        <Image src={creator} alt="" width={60} height={60} />
                        <div>
                            <p className="text-lg tracking-wider">x0023y...yrte</p>
                            <p className="text-gray-400 text-sm tracking-wider">Creator</p>
                        </div>
                    </div>

                        <div className="hidden sm:block">
                        <Image src={right_arrow} alt="rightarrow" width={15} height={15} />
                    </div>

                        <div className="flex items-center gap-4 md:gap-6">
                        <Image src={owner} alt="" width={60} height={60} />
                        <div>
                            <p className="text-lg tracking-wider">x0023y...yrte</p>
                            <p className="text-gray-400 text-sm tracking-wider">New Owner</p>
                        </div>
                    </div>
                </div>

                    <div className="flex gap-4 md:gap-8 py-4 md:py-6 border-b border-[#292929]">
                        <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setShowShareModal(true)}
                        >
                        <p>Share</p>
                        <Image src={share} alt="share" width={25} height={25} />
                    </div>
                    <Image src={web} alt="web" width={25} height={25} />
                </div>

                    <button 
                        className="bg-[#8C62F2] w-full py-3 md:py-4 rounded-xl my-2"
                        onClick={() => setShowPlaceBidModal(true)} // Open modal on click
                    >
                        Buy Now
                    </button>
                    <button 
                        className="bg-[#1C1D1F] w-full py-3 md:py-4 rounded-xl my-2"
                        onClick={() => setShowPlaceBidModal(true)} // Open modal on click
                    >
                        Place a Bid
                    </button>
                </div>
            </div>

            {/* Tab Content Section */}
            <div className="w-full lg:w-[50%] px-4 sm:px-6 md:px-[10%] lg:px-10">
                {/* Tab Navigation */}
                <div className="flex border-b border-[#292929] mt-6 md:mt-8 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-3 md:px-4 py-2 md:py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                            activeTab === 'description'
                                ? 'text-white border-b-2 border-[#8C62F2]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('offers')}
                        className={`px-3 md:px-4 py-2 md:py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                            activeTab === 'offers'
                                ? 'text-white border-b-2 border-[#8C62F2]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Offers/Bids
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`px-3 md:px-4 py-2 md:py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                            activeTab === 'activity'
                                ? 'text-white border-b-2 border-[#8C62F2]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Activity
                    </button>
                </div>

                {/* Page Content */}
                <div className="py-4 md:py-6">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
}

export default NftBid;