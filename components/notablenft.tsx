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
    // Store auto-scroll interval ID and manual scroll timeout
    const autoScrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const manualScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Duplicate the collections for an infinite scroll effect
    const doubledCollections = [...collections, ...collections];

    // Start auto-scrolling continuously
    const startAutoScroll = () => {
        if (autoScrollInterval.current) return; // avoid multiple intervals
        autoScrollInterval.current = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, scrollWidth } = scrollRef.current;
                // Reset when scrollLeft reaches the width of the first set (half the total width)
                if (scrollLeft >= scrollWidth / 2) {
                    scrollRef.current.scrollLeft = 0;
                } else {
                    scrollRef.current.scrollLeft += 1; // increment by 1px without smooth behavior
                }
            }
        }, 20);
    };

    // Stop auto-scrolling and clear any manual scroll timeout
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

    // Manual scroll function: pause auto scroll, perform smooth scroll, then resume auto scroll after delay
    const scroll = (direction: "left" | "right") => {
        stopAutoScroll();
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
        // Restart auto-scroll after a delay (3 seconds)
        manualScrollTimeout.current = setTimeout(() => {
            startAutoScroll();
        }, 3000);
    };

    // Start auto-scroll when component mounts
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
                className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar"
            >
                {doubledCollections.map((collection, index) => (
                    <motion.div
                        key={index}
                        className="min-w-[250px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-white/10"
                    >
                        <Image
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                            width={250}
                            height={160}
                        />
                        <div className="bg-white/10 p-3 rounded-b-lg">
                            <h3 className="px-2">{collection.name}</h3>
                            <div className="grid grid-cols-2 gap-2 text-gray-400 text-sm">
                                <div className="px-2">Floor Price</div>
                                <div>Total Volume</div>
                                <div className="flex items-center gap-1">
                                    <Image src="/eth_l.png" alt="ETH" className="w-4 h-4" width={16} height={16} />
                                    {collection.floorPrice}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Image src="/eth_l.png" alt="ETH" className="w-4 h-4" width={16} height={16} />
                                    {collection.totalVolume}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
