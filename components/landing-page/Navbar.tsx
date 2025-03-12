"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WalletModal from "../ConnectModal";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";

interface NavbarProps {
  onConnect?: () => void;
  onConnectWallet?: () => void;
}

export default function Navbar({ onConnect, onConnectWallet }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const handleWalletClick = () => {
    setIsWalletOpen(true);
    if (onConnect) onConnect();
  };

  const handleConnectWallet = () => {
    if (onConnectWallet) onConnectWallet();
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-10 xl:px-20 py-4 lg:py-6 bg-[#0D1216] w-full lg:px-10">
        <div className="flex items-center gap-4  rounded-lg w-full">
          <Image
            src="/icons/starkbid-logo.svg"
            alt="StarkBid Logo"
            width={110}
            height={32}
          />

          <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg w-full max-w-[250px] xl:max-w-sm">
            <Search className="pb-1"/>
            <input
              type="text"
              placeholder="Search for NFTs and Collections"
              className="bg-transparent text-white placeholder-white/60  outline-none ml-2 w-full"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 w-full">
          <div className="flex gap-7">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Staking
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sell
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Mint
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Explore
            </a>
          </div>

          <div className="flex gap-5">
            <motion.button
              onClick={handleWalletClick}
              whileTap={{ scale: 0.98 }}
              className="px-[18px] !py-1 bg-[#7F56D9] text-white text-nowrap rounded-lg font-semibold text-base 
                       shadow-[0_0_0_3px_#8c6bd533] hover:bg-[#7F56D9]/90 transition-colors"
            >
              Connect Wallet
            </motion.button>
            <button className="px-2 py-2 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
              <ChevronDown />
            </button>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWalletClick}
            className="px-4 py-2 bg-[#7F56D9] text-white rounded-lg font-medium
                     shadow-[0_0_0_4px_#8C6BD5] hover:bg-[#7F56D9]/90 transition-colors"
          >
            Connect
          </motion.button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-64 bg-[#0D1216] shadow-xl z-50"
          >
            <div className="p-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center mt-10 gap-5">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <button className="px-4 py-2 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        onClick={() => handleConnectWallet()}
      />
    </>
  );
}
