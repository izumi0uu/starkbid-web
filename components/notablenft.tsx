import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import  nft1 from "../public/nft1.png"

const collections = [
    {
        name: "Daki Da",
        image: nft1,
        floorPrice: "0.12 ETH",
        totalVolume: "207 ETH",
    },
    {
        name: "Birds of Damascus",
        image: "/path-to-image1.jpg",
        floorPrice: "0.12 ETH",
        totalVolume: "207 ETH",
    },
    {
        name: "Birds of Damascus",
        image: "/path-to-image1.jpg",
        floorPrice: "0.12 ETH",
        totalVolume: "207 ETH",
    },
    {
        name: "Birds of Damascus",
        image: "/path-to-image1.jpg",
        floorPrice: "0.12 ETH",
        totalVolume: "207 ETH",
    },
    {
        name: "Birds of Damascus",
        image: "/path-to-image1.jpg",
        floorPrice: "0.12 ETH",
        totalVolume: "207 ETH",
    },
];

export default function NotableCollections() {
    const scrollRef = useRef(null);

    const scroll = (direction: string) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full p-4 bg-gray-900 text-white">
            <h2 className="text-xl font-bold mb-4">Notable Collections</h2>
            <div className="relative">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full top-1/2 -translate-y-1/2"
                >
                    <ChevronLeft size={24} />
                </button>
                <motion.div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
                >
                    {collections.map((collection, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[250px] bg-gray-800 p-4 rounded-lg shadow-lg"
                        >
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-40 object-cover rounded-md mb-2"
                            />
                            <h3 className="font-semibold">{collection.name}</h3>
                            <p className="text-sm text-gray-400">Floor Price: {collection.floorPrice}</p>
                            <p className="text-sm text-gray-400">Total Volume: {collection.totalVolume}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full top-1/2 -translate-y-1/2"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
