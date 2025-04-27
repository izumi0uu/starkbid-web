"use client";
import { useState } from "react";
import Image from "next/image";
import Ethereum from "../../public/Ethereum.png";
import Collectibles1 from "../../public/Collectibles1.png";
import Collectibles2 from "../../public/Collectibles2.png";
import Collectibles3 from "../../public/Collectibles3.png";
import Collectibles4 from "../../public/Collectibles4.png";
import Collectibles5 from "../../public/Collectibles5.png";
import Collectibles6 from "../../public/Collectibles6.png";
import Collectibles7 from "../../public/Collectibles7.png";
import Collectibles8 from "../../public/Collectibles8.png";
import Collectibles9 from "../../public/Collectibles9.png";
import Collectibles10 from "../../public/Collectibles10.png";

// Sample data with 70 collections, including blockchain field
const collectionsData = [
    { id: 1, name: "Xenos", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 2, name: "Bored Apes", image: Collectibles2, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "-20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 3, name: "Monalissa", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "-20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Solana" },
    { id: 4, name: "Bad BUNNIEZ", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "-20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 5, name: "Mickymore", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 6, name: "Zain Califorat", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 7, name: "The Vagabum", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 8, name: "Batties", image: Collectibles3, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 9, name: "Dan Xylym", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 10, name: "Net Dream", image: Collectibles1, chainicon: Ethereum, floorPrice: "35 ETH", volume: "200 ETH", topOffer: "31 ETH", change: "+20.40%", floorId: 150, holders: "45%", holdersDetail: "2054/4501", blockchain: "Ethereum" },
    { id: 11, name: "Crypto Punks", image: Collectibles1, chainicon: Ethereum, floorPrice: "40 ETH", volume: "180 ETH", topOffer: "35 ETH", change: "+15.20%", floorId: 142, holders: "48%", holdersDetail: "2154/4501", blockchain: "Ethereum" },
    { id: 12, name: "Doodles", image: Collectibles1, chainicon: Ethereum, floorPrice: "28 ETH", volume: "150 ETH", topOffer: "25 ETH", change: "-5.40%", floorId: 135, holders: "42%", holdersDetail: "1854/4201", blockchain: "Ethereum" },
    { id: 13, name: "Azuki", image: Collectibles4, chainicon: Ethereum, floorPrice: "32 ETH", volume: "210 ETH", topOffer: "30 ETH", change: "+12.30%", floorId: 160, holders: "44%", holdersDetail: "1987/4501", blockchain: "Ethereum" },
    { id: 14, name: "Cool Cats", image: Collectibles1, chainicon: Ethereum, floorPrice: "20 ETH", volume: "120 ETH", topOffer: "18 ETH", change: "-8.20%", floorId: 145, holders: "40%", holdersDetail: "1804/4501", blockchain: "Ethereum" },
    { id: 15, name: "Moonbirds", image: Collectibles1, chainicon: Ethereum, floorPrice: "38 ETH", volume: "220 ETH", topOffer: "36 ETH", change: "+25.60%", floorId: 155, holders: "47%", holdersDetail: "2124/4501", blockchain: "Ethereum" },
    { id: 16, name: "CloneX", image: Collectibles5, chainicon: Ethereum, floorPrice: "30 ETH", volume: "175 ETH", topOffer: "28 ETH", change: "+10.50%", floorId: 148, holders: "43%", holdersDetail: "1935/4501", blockchain: "Ethereum" },
    { id: 17, name: "Meebits", image: Collectibles6, chainicon: Ethereum, floorPrice: "25 ETH", volume: "140 ETH", topOffer: "22 ETH", change: "-12.40%", floorId: 138, holders: "41%", holdersDetail: "1845/4501", blockchain: "Ethereum" },
    { id: 18, name: "World of Women", image: Collectibles7, chainicon: Ethereum, floorPrice: "22 ETH", volume: "130 ETH", topOffer: "20 ETH", change: "+8.30%", floorId: 132, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 19, name: "Pudgy Penguins", image: Collectibles8, chainicon: Ethereum, floorPrice: "27 ETH", volume: "160 ETH", topOffer: "25 ETH", change: "+18.70%", floorId: 144, holders: "46%", holdersDetail: "2070/4501", blockchain: "Ethereum" },
    { id: 20, name: "Mutant Apes", image: Collectibles1, chainicon: Ethereum, floorPrice: "33 ETH", volume: "190 ETH", topOffer: "30 ETH", change: "-7.20%", floorId: 152, holders: "44%", holdersDetail: "1980/4501", blockchain: "Ethereum" },
    { id: 21, name: "Cryptoadz", image: Collectibles1, chainicon: Ethereum, floorPrice: "21 ETH", volume: "125 ETH", topOffer: "19 ETH", change: "+5.60%", floorId: 130, holders: "38%", holdersDetail: "1710/4501", blockchain: "Ethereum" },
    { id: 22, name: "Invisible Friends", image: Collectibles1, chainicon: Ethereum, floorPrice: "24 ETH", volume: "145 ETH", topOffer: "22 ETH", change: "-4.30%", floorId: 136, holders: "40%", holdersDetail: "1800/4501", blockchain: "Ethereum" },
    { id: 23, name: "Goblintown", image: Collectibles1, chainicon: Ethereum, floorPrice: "18 ETH", volume: "110 ETH", topOffer: "16 ETH", change: "+9.80%", floorId: 125, holders: "37%", holdersDetail: "1665/4501", blockchain: "Ethereum" },
    { id: 24, name: "VeeFriends", image: Collectibles1, chainicon: Ethereum, floorPrice: "29 ETH", volume: "170 ETH", topOffer: "27 ETH", change: "+14.50%", floorId: 146, holders: "42%", holdersDetail: "1890/4501", blockchain: "Ethereum" },
    { id: 25, name: "Deadfellaz", image: Collectibles9, chainicon: Ethereum, floorPrice: "19 ETH", volume: "115 ETH", topOffer: "17 ETH", change: "-3.20%", floorId: 128, holders: "36%", holdersDetail: "1620/4501", blockchain: "Ethereum" },
    { id: 26, name: "Degen Toonz", image: Collectibles10, chainicon: Ethereum, floorPrice: "23 ETH", volume: "135 ETH", topOffer: "21 ETH", change: "+11.20%", floorId: 134, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 27, name: "NFT Worlds", image: Collectibles1, chainicon: Ethereum, floorPrice: "34 ETH", volume: "195 ETH", topOffer: "32 ETH", change: "+19.80%", floorId: 153, holders: "45%", holdersDetail: "2025/4501", blockchain: "Ethereum" },
    { id: 28, name: "Cyberkongz", image: Collectibles1, chainicon: Ethereum, floorPrice: "31 ETH", volume: "180 ETH", topOffer: "29 ETH", change: "-6.70%", floorId: 149, holders: "43%", holdersDetail: "1935/4501", blockchain: "Ethereum" },
    { id: 29, name: "Kaiju Kingz", image: Collectibles1, chainicon: Ethereum, floorPrice: "26 ETH", volume: "155 ETH", topOffer: "24 ETH", change: "+7.40%", floorId: 141, holders: "41%", holdersDetail: "1845/4501", blockchain: "Ethereum" },
    { id: 30, name: "CryptoKitties", image: Collectibles1, chainicon: Ethereum, floorPrice: "17 ETH", volume: "105 ETH", topOffer: "15 ETH", change: "-9.50%", floorId: 122, holders: "35%", holdersDetail: "1575/4501", blockchain: "Ethereum" },
    { id: 31, name: "Art Blocks", image: Collectibles1, chainicon: Ethereum, floorPrice: "36 ETH", volume: "210 ETH", topOffer: "34 ETH", change: "+22.10%", floorId: 156, holders: "46%", holdersDetail: "2070/4501", blockchain: "Ethereum" },
    { id: 32, name: "Ghxsts", image: Collectibles1, chainicon: Ethereum, floorPrice: "20 ETH", volume: "120 ETH", topOffer: "18 ETH", change: "+6.30%", floorId: 129, holders: "37%", holdersDetail: "1665/4501", blockchain: "Ethereum" },
    { id: 33, name: "CyberBrokers", image: Collectibles1, chainicon: Ethereum, floorPrice: "28 ETH", volume: "165 ETH", topOffer: "26 ETH", change: "-8.90%", floorId: 143, holders: "42%", holdersDetail: "1890/4501", blockchain: "Ethereum" },
    { id: 34, name: "Fvck Crystals", image: Collectibles1, chainicon: Ethereum, floorPrice: "22 ETH", volume: "130 ETH", topOffer: "20 ETH", change: "+10.70%", floorId: 132, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 35, name: "Gutter Cats", image: Collectibles1, chainicon: Ethereum, floorPrice: "25 ETH", volume: "150 ETH", topOffer: "23 ETH", change: "-5.10%", floorId: 138, holders: "40%", holdersDetail: "1800/4501", blockchain: "Ethereum" },
    { id: 36, name: "Chain Runners", image: Collectibles1, chainicon: Ethereum, floorPrice: "19 ETH", volume: "115 ETH", topOffer: "17 ETH", change: "+8.60%", floorId: 127, holders: "38%", holdersDetail: "1710/4501", blockchain: "Ethereum" },
    { id: 37, name: "Lazy Lions", image: Collectibles1, chainicon: Ethereum, floorPrice: "21 ETH", volume: "125 ETH", topOffer: "19 ETH", change: "-7.30%", floorId: 130, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 38, name: "Neo Tokyo", image: Collectibles1, chainicon: Ethereum, floorPrice: "37 ETH", volume: "215 ETH", topOffer: "35 ETH", change: "+24.20%", floorId: 157, holders: "47%", holdersDetail: "2115/4501", blockchain: "Ethereum" },
    { id: 39, name: "Cool Dogs", image: Collectibles1, chainicon: Ethereum, floorPrice: "18 ETH", volume: "110 ETH", topOffer: "16 ETH", change: "-4.60%", floorId: 124, holders: "36%", holdersDetail: "1620/4501", blockchain: "Ethereum" },
    { id: 40, name: "Space Doodles", image: Collectibles1, chainicon: Ethereum, floorPrice: "27 ETH", volume: "160 ETH", topOffer: "25 ETH", change: "+13.40%", floorId: 142, holders: "41%", holdersDetail: "1845/4501", blockchain: "Ethereum" },
    { id: 41, name: "Meta Heroes", image: Collectibles1, chainicon: Ethereum, floorPrice: "23 ETH", volume: "135 ETH", topOffer: "21 ETH", change: "-10.30%", floorId: 133, holders: "40%", holdersDetail: "1800/4501", blockchain: "Ethereum" },
    { id: 42, name: "Crypto Coven", image: Collectibles1, chainicon: Ethereum, floorPrice: "24 ETH", volume: "140 ETH", topOffer: "22 ETH", change: "+9.20%", floorId: 135, holders: "41%", holdersDetail: "1845/4501", blockchain: "Ethereum" },
    { id: 43, name: "Creature World", image: Collectibles1, chainicon: Ethereum, floorPrice: "20 ETH", volume: "120 ETH", topOffer: "18 ETH", change: "-6.10%", floorId: 128, holders: "38%", holdersDetail: "1710/4501", blockchain: "Ethereum" },
    { id: 44, name: "Stoner Cats", image: Collectibles1, chainicon: Ethereum, floorPrice: "19 ETH", volume: "115 ETH", topOffer: "17 ETH", change: "+7.80%", floorId: 126, holders: "37%", holdersDetail: "1665/4501", blockchain: "Ethereum" },
    { id: 45, name: "Punks Comic", image: Collectibles1, chainicon: Ethereum, floorPrice: "26 ETH", volume: "155 ETH", topOffer: "24 ETH", change: "+15.70%", floorId: 140, holders: "42%", holdersDetail: "1890/4501", blockchain: "Ethereum" },
    { id: 46, name: "Genesis Box", image: Collectibles1, chainicon: Ethereum, floorPrice: "30 ETH", volume: "175 ETH", topOffer: "28 ETH", change: "-9.40%", floorId: 147, holders: "43%", holdersDetail: "1935/4501", blockchain: "Ethereum" },
    { id: 47, name: "Mekaverse", image: Collectibles1, chainicon: Ethereum, floorPrice: "25 ETH", volume: "145 ETH", topOffer: "23 ETH", change: "+12.60%", floorId: 137, holders: "40%", holdersDetail: "1800/4501", blockchain: "Ethereum" },
    { id: 48, name: "Metroverse", image: Collectibles1, chainicon: Ethereum, floorPrice: "22 ETH", volume: "130 ETH", topOffer: "20 ETH", change: "-8.20%", floorId: 131, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 49, name: "Lost Poets", image: Collectibles1, chainicon: Ethereum, floorPrice: "28 ETH", volume: "165 ETH", topOffer: "26 ETH", change: "+17.30%", floorId: 144, holders: "42%", holdersDetail: "1890/4501", blockchain: "Ethereum" },
    { id: 50, name: "Wolf Game", image: Collectibles1, chainicon: Ethereum, floorPrice: "21 ETH", volume: "125 ETH", topOffer: "19 ETH", change: "-5.90%", floorId: 129, holders: "38%", holdersDetail: "1710/4501", blockchain: "Ethereum" },
    { id: 51, name: "Alpha Dogs", image: Collectibles1, chainicon: Ethereum, floorPrice: "24 ETH", volume: "140 ETH", topOffer: "22 ETH", change: "+11.50%", floorId: 134, holders: "40%", holdersDetail: "1800/4501", blockchain: "Ethereum" },
    { id: 52, name: "Pixel Vault", image: Collectibles1, chainicon: Ethereum, floorPrice: "32 ETH", volume: "185 ETH", topOffer: "30 ETH", change: "+20.10%", floorId: 151, holders: "44%", holdersDetail: "1980/4501", blockchain: "Ethereum" },
    { id: 53, name: "Galaxy Eggs", image: Collectibles1, chainicon: Ethereum, floorPrice: "18 ETH", volume: "110 ETH", topOffer: "16 ETH", change: "-7.80%", floorId: 125, holders: "37%", holdersDetail: "1665/4501", blockchain: "Ethereum" },
    { id: 54, name: "Prime Apes", image: Collectibles1, chainicon: Ethereum, floorPrice: "29 ETH", volume: "170 ETH", topOffer: "27 ETH", change: "+16.40%", floorId: 146, holders: "43%", holdersDetail: "1935/4501", blockchain: "Ethereum" },
    { id: 55, name: "Ether Cards", image: Collectibles1, chainicon: Ethereum, floorPrice: "23 ETH", volume: "135 ETH", topOffer: "21 ETH", change: "-6.50%", floorId: 133, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 56, name: "Crypto Unicorns", image: Collectibles1, chainicon: Ethereum, floorPrice: "20 ETH", volume: "120 ETH", topOffer: "18 ETH", change: "+9.70%", floorId: 128, holders: "38%", holdersDetail: "1710/4501", blockchain: "Ethereum" },
    { id: 57, name: "Boki", image: Collectibles1, chainicon: Ethereum, floorPrice: "25 ETH", volume: "145 ETH", topOffer: "23 ETH", change: "+14.20%", floorId: 137, holders: "41%", holdersDetail: "1845/4501", blockchain: "Ethereum" },
    { id: 58, name: "Forgotten Runes", image: Collectibles1, chainicon: Ethereum, floorPrice: "27 ETH", volume: "160 ETH", topOffer: "25 ETH", change: "-8.60%", floorId: 142, holders: "42%", holdersDetail: "1890/4501", blockchain: "Ethereum" },
    { id: 59, name: "Galaxy Fight Club", image: Collectibles1, chainicon: Ethereum, floorPrice: "19 ETH", volume: "115 ETH", topOffer: "17 ETH", change: "+10.30%", floorId: 127, holders: "37%", holdersDetail: "1665/4501", blockchain: "Ethereum" },
    { id: 60, name: "Psychedelics", image: Collectibles1, chainicon: Ethereum, floorPrice: "31 ETH", volume: "180 ETH", topOffer: "29 ETH", change: "+21.50%", floorId: 149, holders: "44%", holdersDetail: "1980/4501", blockchain: "Ethereum" },
    { id: 61, name: "Meta Angels", image: Collectibles1, chainicon: Ethereum, floorPrice: "22 ETH", volume: "130 ETH", topOffer: "20 ETH", change: "-5.40%", floorId: 131, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 62, name: "Mfers", image: Collectibles1, chainicon: Ethereum, floorPrice: "17 ETH", volume: "105 ETH", topOffer: "15 ETH", change: "+8.20%", floorId: 123, holders: "36%", holdersDetail: "1620/4501", blockchain: "Ethereum" },
    { id: 63, name: "FLUF World", image: Collectibles1, chainicon: Ethereum, floorPrice: "26 ETH", volume: "155 ETH", topOffer: "24 ETH", change: "+13.90%", floorId: 140, holders: "41%", holdersDetail: "1845/4501", blockchain: "Ethereum" },
    { id: 64, name: "Loot Project", image: Collectibles1, chainicon: Ethereum, floorPrice: "33 ETH", volume: "190 ETH", topOffer: "31 ETH", change: "-9.70%", floorId: 152, holders: "45%", holdersDetail: "2025/4501", blockchain: "Ethereum" },
    { id: 65, name: "Boss Beauties", image: Collectibles1, chainicon: Ethereum, floorPrice: "21 ETH", volume: "125 ETH", topOffer: "19 ETH", change: "+12.10%", floorId: 130, holders: "38%", holdersDetail: "1710/4501", blockchain: "Ethereum" },
    { id: 66, name: "Robotos", image: Collectibles1, chainicon: Ethereum, floorPrice: "24 ETH", volume: "140 ETH", topOffer: "22 ETH", change: "-7.30%", floorId: 135, holders: "40%", holdersDetail: "1800/4501", blockchain: "Ethereum" },
    { id: 67, name: "Alien Frens", image: Collectibles1, chainicon: Ethereum, floorPrice: "18 ETH", volume: "110 ETH", topOffer: "16 ETH", change: "+9.60%", floorId: 125, holders: "37%", holdersDetail: "1665/4501", blockchain: "Ethereum" },
    { id: 68, name: "My Pet Hooligan", image: Collectibles1, chainicon: Ethereum, floorPrice: "22 ETH", volume: "130 ETH", topOffer: "20 ETH", change: "+11.40%", floorId: 132, holders: "39%", holdersDetail: "1755/4501", blockchain: "Ethereum" },
    { id: 69, name: "Noun Punks", image: Collectibles1, chainicon: Ethereum, floorPrice: "30 ETH", volume: "175 ETH", topOffer: "28 ETH", change: "-8.10%", floorId: 147, holders: "43%", holdersDetail: "1935/4501", blockchain: "Ethereum" },
    { id: 70, name: "BAYC X MAYC", image: Collectibles1, chainicon: Ethereum, floorPrice: "34 ETH", volume: "195 ETH", topOffer: "32 ETH", change: "+23.80%", floorId: 154, holders: "46%", holdersDetail: "2070/4501", blockchain: "Ethereum" },
];

interface CollectionsPageProps {
    activeTab: string;
    searchQuery: string;
    blockchain: string;
}

export default function CollectionsPage({ activeTab, searchQuery, blockchain }: CollectionsPageProps) {
    const [visibleCount, setVisibleCount] = useState(40);
    // const totalCollections = collectionsData.length;

    const loadMore = () => {
        setVisibleCount((prev) => prev + 40);
    };

    // Filter and sort collections based on props
    const filteredCollections = collectionsData
        .filter((collection) => {
            const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBlockchain = blockchain ? collection.blockchain === blockchain : true;

            if (activeTab === "top-gainers") {
                return matchesSearch && matchesBlockchain && collection.change.startsWith("+");
            } else if (activeTab === "top-losers") {
                return matchesSearch && matchesBlockchain && collection.change.startsWith("-");
            }
            return matchesSearch && matchesBlockchain;
        })
        .sort((a, b) => {
            if (activeTab === "top-gainers" || activeTab === "top-losers") {
                const aChange = parseFloat(a.change);
                const bChange = parseFloat(b.change);
                return activeTab === "top-gainers" ? bChange - aChange : aChange - bChange;
            }
            return a.id - b.id;
        });

    const visibleCollections = filteredCollections.slice(0, visibleCount);
    const hasMoreCollections = visibleCount < filteredCollections.length;

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="py-8">
                <div className="w-full overflow-x-auto">
                    <table className="w-full lg:w-full md:w-[1000px] sm:w-[800px] border-collapse">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-700">
                                <th className="py-3 text-left px-3 w-16 sticky left-0 bg-black z-30">#</th>
                                <th className="py-3 sticky text-left bg-black z-30">
                                    COLLECTION
                                </th>
                                <th className="py-3 text-left whitespace-nowrap">COLLECTION ID</th>
                                <th className="py-3 text-left whitespace-nowrap">FLOOR PRICE</th>
                                <th className="py-3 text-left whitespace-nowrap">VOLUME</th>
                                <th className="py-3 text-left whitespace-nowrap">SALES</th>
                                <th className="py-3 text-left whitespace-nowrap">TOP OFFER</th>
                                <th className="py-3 text-right pr-4 whitespace-nowrap">HOLDERS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleCollections.map((collection) => (
                                <tr key={collection.id} className="border-b border-gray-800 hover:bg-gray-900 group ">
                                    <td className="py-4 pl-4 sticky left-0 bg-black z-50 group-hover:bg-gray-900 group-hover:z-40 min-w-[100px] sm:w-[150px]">{collection.id}</td>
                                    <td className="py-4 sticky bg-black z-30 min-w-[300px] sm:w-[150px] group-hover:bg-gray-900 group-hover:z-40">
                                        <div className="flex gap-3 items-center">
                                            <div className="relative w-10 h-10">
                                                <Image
                                                    src={collection.image}
                                                    alt={collection.name}
                                                    width={60}
                                                    height={60}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <Image
                                                    src={collection.chainicon}
                                                    alt={`${collection.name} blockchain icon`}
                                                    width={60}
                                                    height={60}
                                                    className="w-4 h-4 rounded-full bg-white absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3"
                                                />
                                            </div>
                                            <div className="text-lg font-semibold truncate">{collection.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 group-hover:bg-gray-900 md:min-w-[400px] sm:w-[150px]">{collection.floorId}</td>
                                    <td className="py-4 group-hover:bg-gray-900 md:min-w-[400px] sm:w-[150px]">{collection.floorPrice}</td>
                                    <td className="py-4 group-hover:bg-gray-900 md:min-w-[400px] sm:w-[150px]">{collection.volume}</td>
                                    <td className={`py-4 group-hover:bg-gray-900 md:min-w-[400px] sm:w-[150px] ${
                                        collection.change?.startsWith("+") 
                                            ? "text-green" 
                                            : collection.change?.startsWith("-") 
                                                ? "text-red" 
                                                : ""
                                    }`}>
                                        {collection.change}
                                    </td>
                                    <td className="py-4 group-hover:bg-gray-900 md:min-w-[400px] sm:w-[150px]">{collection.topOffer}</td>
                                    <td className="py-4 text-right pr-4 group-hover:bg-gray-900">
                                        <div className="w-fit h-fit flex flex-col justify-center p-2 ml-auto">
                                            <div>{collection.holders}</div>
                                            <div className="text-xs text-gray-500 w-[150px]">{collection.holdersDetail}</div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    Showing {visibleCollections.length} of {filteredCollections.length} collections
                </div>
                {hasMoreCollections && (
                    <div className="my-8 flex justify-center">
                        <button
                            onClick={loadMore}
                            className="text-white bg-[#1C1D1F] py-2 px-4 rounded-lg hover:bg-[#2a2b2e] transition-colors"
                        >
                            See more
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}