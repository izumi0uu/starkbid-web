"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const collections = [
    { name: "Daki Da", image: "/nft1.png", floorPrice: "0.12 ETH", totalVolume: "207 ETH" },
    { name: "Birds of Damascus", image: "/nft2.png", floorPrice: "0.12 ETH", totalVolume: "207 ETH" },
    { name: "Birds of Damascus", image: "/nft3.png", floorPrice: "0.12 ETH", totalVolume: "207 ETH" },
    { name: "Birds of Damascus", image: "/nft4.png", floorPrice: "0.12 ETH", totalVolume: "207 ETH" },
    { name: "Birds of Damascus", image: "/nft5.jpeg", floorPrice: "0.12 ETH", totalVolume: "207 ETH" },
];

export default function NotableCollections() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    
    const autoScrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const manualScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const doubledCollections = [...collections, ...collections];

    
    const autoSwipe = () => {
        if (scrollRef.current) {
            const currentScroll = scrollRef.current.scrollLeft;
            const cardWidth = 260;
            const maxScroll = scrollRef.current.scrollWidth / 2;

            if (currentScroll + cardWidth >= maxScroll) {
            
                scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                
                scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
            }
        }
    };

    const startAutoScroll = () => {
        if (autoScrollInterval.current) return; 
        autoScrollInterval.current = setInterval(() => {
            autoSwipe();
        }, 5000);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
        }
        if (manualScrollTimeout.current) {
            clearTimeout(manualScrollTimeout.current);
            manualScrollTimeout.current = null;
        }
    };

    const scroll = (direction: "left" | "right") => {
        stopAutoScroll();
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
        
        manualScrollTimeout.current = setTimeout(() => {
            startAutoScroll();
        }, 4000);
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    return (
        <div className="relative w-full p-6 text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Notable Collections</h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll("left")} className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={() => scroll("right")} className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
            <motion.div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar transition-transform duration-500 ease-in-out"
            >
                {doubledCollections.map((collection, index) => (
                    <motion.div
                        key={index}
                        className="min-w-[250px] rounded-lg shadow-lg transition-all duration-500"
                    >
                        <div className="bg-[#1A1A1A] rounded-b-lg overflow-hidden">
                            <Image
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-40 object-cover rounded-t-lg transition-transform hover:scale-105 duration-300"
                                width={250}
                                height={160}
                            />
                            <div className="p-3">
                                <h3 className="px-2">{collection.name}</h3>
                                <div className="grid grid-cols-2 gap-2 text-gray-400 text-sm">
                                    <div className="px-2">Floor Price</div>
                                    <div>Total Volume</div>
                                    <div className="flex items-center gap-1">
                                        <Image src="/eth_l.png" alt="ETH" className="w-6 h-6" width={20} height={20} />
                                        {collection.floorPrice}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Image src="/eth_l.png" alt="ETH" className="w-6 h-6" width={20} height={20} />
                                        {collection.totalVolume}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
