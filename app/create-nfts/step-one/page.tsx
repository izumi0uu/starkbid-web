"use client";
import BackButton from "@/components/create-nfts/common/BackButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const StepOne = () => {
  const [selectedBlockChain, setSelectedBlockChain] = useState("");
  const router = useRouter();

  const blockchains = [
    { title: "Starknet", image: "/svgs/starknet-logo.svg", id: 1 },
    { title: "Ethereum", image: "/svgs/ethereum-logo.svg", id: 2 },
    { title: "USDT", image: "/svgs/usdt-logo.svg", id: 3 },
    { title: "Solana", image: "/svgs/solana-logo.svg", id: 4 },
    { title: "Doge", image: "/svgs/dodge-logo.svg", id: 5 },
    { title: "Bitcoin", image: "/svgs/bitcoin-logo.svg", id: 6 },
  ];

  const btnDisabled = selectedBlockChain === "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full h-full"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BackButton />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
          className="w-full mt-4"
        >
          <h1 className="text-white text-xl md:text-2xl lg:text-4xl">
            Choose Blockchain
          </h1>
          <p className="text-sm lg:text-base text-ash mt-3 text-left font-normal">
            Please choose a preferred blockchain to continue.
          </p>
        </motion.div>

        <motion.div
          className="w-full mt-7 flex items-center justify-between flex-wrap"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {blockchains.map(({ title, id, image }) => {
            const isSelected = title === selectedBlockChain;
            return (
              <motion.div
                key={id}
                className="w-[30%] mb-3 lg:mb-0 lg:w-[15.5%]"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <div
                  onClick={() => setSelectedBlockChain(title)}
                  className={`w-full cursor-pointer ${
                    isSelected
                      ? "border-purple border-4"
                      : "border-darkerGray border"
                  } rounded-lg flex items-center justify-center h-24 lg:h-52  transition-shadow duration-300`}
                >
                  <Image
                    src={image}
                    alt={title}
                    width={95}
                    height={95}
                    className="w-12 h-12 lg:w-24 lg:h-24"
                  />
                </div>
                <p className="text-xs md:text-sm text-white text-center mt-3 lg:text-xl font-bold">
                  {title}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="w-full mt-12 flex items-center justify-between gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
        >
          <button
            onClick={() => {
              setSelectedBlockChain("");
            }}
            className="w-1/2 py-3 text-sm md:text-base bg-darkGray cursor-pointer text-center rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => router.push("/create-nfts/step-two")}
            disabled={btnDisabled}
            className={`w-1/2 py-3 ${
              btnDisabled
                ? "bg-darkGray cursor-not-allowed"
                : "bg-purple cursor-pointer"
            } text-sm md:text-base text-center rounded-md`}
          >
            Next
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepOne;
