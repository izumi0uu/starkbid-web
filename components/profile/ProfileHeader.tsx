'use client';

import React from 'react';
import Image from 'next/image';
import { Copy, Share2, Globe, Send } from 'lucide-react';
import { SlSocialInstagram } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { format } from 'date-fns';
import { FaEthereum } from "react-icons/fa";

export interface UserProfile {
    address: string;
    username: string;
    avatarUrl: string;
    verified: boolean;
    bio: string;
    stats: {
        totalValueEth: string;
        totalValueUsd: string;
        ownedCount: number;
        createdCount: number;
        collectionsCount: number;
    };
    social: {
        twitter: string;
        instagram: string;
        discord: string;
        website: string;
    };
    dateJoined: string;
}

interface ProfileHeaderProps {
    profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
    const copyAddress = () => {
        if (profile.address) {
            navigator.clipboard.writeText(profile.address);
        }
    };

    const formatAddress = (address: string | undefined) => {
        if (!address) return 'Loading...';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="mx-auto w-full px-4" 
                 style={{ background: 'linear-gradient(to bottom, #7454DD 0%, #7454DD 10%, #101213 90%, #101213 100%)' }}>
    <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                {/* Left Section */}
                <div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start">
                    <div className="relative w-28 h-28 rounded-full ring-4 ring-white mb-3">
                        <Image
                            src={profile.avatarUrl}
                            alt={`${profile.username} avatar`}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-white text-center lg:text-left">
                        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2">
                            <h1 className="text-[30px] font-sans">{profile.username}</h1>
                            {profile.verified && (
                                <Image
                                    src="/verified.png"
                                    alt="verified"
                                    width={30}
                                    height={30}
                                    className="w-[30px] h-[30px]"
                                />
                            )}
                        </div>
                        <div className="flex items-center justify-center lg:justify-start space-x-1 mt-[0.5px] mb-4 text-[#8E9BAE]">
                            <span className="font-mono">{formatAddress(profile.address)}</span>
                            <button onClick={copyAddress} className="hover:text-white" disabled={!profile.address}>
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Socials */}
                        <div className="flex items-center justify-center lg:justify-start gap-[30px] text-white ml-2">
                            <button className="inline-flex items-center space-x-3 hover:text-white">
                                <span>Share</span>
                                <Share2 className="w-[21px] h-[21px]" />
                            </button>
                            <button onClick={copyAddress} className="hover:text-white" disabled={!profile.address}>
                                <Copy className="w-[21px] h-[21px]" />
                            </button>
                            <a href={profile.social.website} target="_blank" rel="noopener noreferrer">
                                <Globe className="w-[21px] h-[21px] hover:text-white" />
                            </a>
                            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                <SlSocialInstagram className="w-[21px] h-[21px] hover:text-white" />
                            </a>
                            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                <FaXTwitter className="w-[21px] h-[21px] hover:text-white" />
                            </a>
                            <a href={profile.social.discord} target="_blank" rel="noopener noreferrer">
                                <FaDiscord className="w-[21px] h-[21px] hover:text-white" />
                            </a>
                            <a href={`mailto:?subject=Check%20out%20${profile.username}&body=Link`}>
                                <Send className="w-[21px] h-[21px] hover:text-white" />
                            </a>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4 mt-4">
                            <button className="bg-[#1C1D1F] text-white px-4 py-2 text-[14px] rounded-lg flex items-center">
                                Ethereum <FaEthereum className="ml-1" />
                            </button>
                            <button className="bg-[#1C1D1F] text-white px-4 py-2 text-[14px] rounded-lg flex items-center">
                                Starknet{' '}
                                <Image
                                    src="/startnet.png"
                                    alt="starknet logo"
                                    width={14}
                                    height={14}
                                    className="ml-1"
                                />
                            </button>
                            <button className="bg-[#1C1D1F] text-[#8E9BAE] px-4 py-2 text-[14px] rounded-lg flex items-center">
                                Date joined{' '}
                                <span className="text-white ml-1">
                                    {format(new Date(profile.dateJoined), 'MMM d, yyyy')}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

               {/* Stats and Bio Section */}
<div className="col-span-1 lg:col-span-3 flex flex-col w-full">

<div className="flex flex-wrap justify-between items-center gap-y-6 w-full">
    <div className="text-center text-white flex-1 min-w-[120px]">
        <p className="text-[16px] text-[#8E9BAE]">Total Value</p>
        <p className="text-[20px] text-white mt-1 font-bold">{profile.stats.totalValueEth} ETH</p>
    </div>

    <div className="hidden lg:flex h-12 w-px border-l border-dotted border-[#8E9BAE] mx-4 self-center" />

    <div className="text-center text-white flex-1 min-w-[120px]">
        <p className="text-[16px] text-[#8E9BAE]">Total Value(USD)</p>
        <p className="text-[20px] text-white mt-1 font-bold">${profile.stats.totalValueUsd}</p>
    </div>

    <div className="hidden lg:flex h-12 w-px border-l border-dotted border-[#8E9BAE] mx-4 self-center" />

    <div className="text-center text-white flex-1 min-w-[120px]">
        <p className="text-[16px] text-[#8E9BAE]">Owned Items</p>
        <p className="text-[20px] text-white mt-1 font-bold">{profile.stats.ownedCount}</p>
    </div>

    <div className="hidden lg:flex h-12 w-px border-l border-dotted border-[#8E9BAE] mx-4 self-center" />

    <div className="text-center text-white flex-1 min-w-[120px]">
        <p className="text-[16px] text-[#8E9BAE]">Collections</p>
        <p className="text-[20px] text-white mt-1 font-bold">{profile.stats.collectionsCount}</p>
    </div>
</div>



    {/* Bio directly under stats */}
    <div className="mt-6 text-left w-full">
        <h2 className="text-white text-lg font-medium">Bio</h2>
        <p className="text-[#8E9BAE] mt-2 max-w-2xl">{profile.bio}</p>
    </div>
</div>

            </div>
        </div>
    );
};

export default ProfileHeader;
