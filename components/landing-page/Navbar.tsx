"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdSearch } from "react-icons/md";
import Link from "next/link";
import { ConnectButton } from "./connect-button";
import { useAccount } from "@starknet-react/core";
import { navItems } from "@/constants/navbar";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isConnected } = useAccount();

  return (
    <nav className="max-w-[1440px] w-full mx-auto text-white flex items-center justify-between px-4 py-2 border-b border-b-darkerGray">
      <div className="flex items-center gap-x-6">
        <Link href={"/"} className="flex items-center gap-x-2">
          <Image
            src="/icons/starkbid-logo.png"
            alt="StarkBid Logo"
            width={100}
            height={40}
          />
        </Link>

        {/* Search Bar */}
        <div className="mx-4 max-w-80 flex items-center bg-[#1E1E1E] rounded-lg px-2 py-1">
          <div className="w-72">
            <input
              type="text"
              placeholder="Search for NFTs, Collections or users"
              className="hidden md:block w-full bg-[#1E1E1E] text-white px-1 rounded-lg focus:outline-none"
            />
          </div>
          <MdSearch
            size={30}
            className="hidden md:block text-ash bg-darkGray p-1 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300"
          />
        </div>

        <div className="w-fit hidden md:flex items-center gap-x-4 ml-12">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const IconComponent = isActive ? item.activeIcon : item.icon;

            return (
              <Link
                href={item.path}
                key={item.name}
                className="flex gap-1 items-center p-2 rounded-lg transition-colors duration-300"
              >
                <Image
                  src={IconComponent}
                  alt={item.name}
                  width={24}
                  height={24}
                  quality={90}
                />
                <span className="text-xs md:text-sm font-medium ml-1 text-ash">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <div className="flex items-center gap-x-4">
          {isConnected && (
            <div className="w-fit h-fit relative">
              <Image
                src="/svgs/notification.svg"
                alt="notification"
                width={24}
                height={24}
                quality={90}
              />
              <div className="w-3 h-3 rounded-full bg-red-700 absolute -top-1 -right-1" />
            </div>
          )}

          <Image
            src="/svgs/shopping.svg"
            alt="shopping"
            width={24}
            height={24}
            quality={90}
          />
        </div>
        {/* Connect Wallet Button */}
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
