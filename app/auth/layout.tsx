"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [image, setImage] = useState(
    "/svgs/stop-anti-against-abandon-gas-mask-word-graphic.svg"
  );
  const [title, setTitle] = useState(
    "The Next-Gen Auction & Collectible Marketplace on Starknet"
  );
  const [description, setDescription] = useState(
    "StarkBid offers an unparalleled experience."
  );
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("connect-wallet")) {
      setImage("/svgs/digital-art-ai-technology-background.svg");
      setTitle("Unlock the Future of Digital Auctions & Collectibles");
      setDescription(
        "By leveraging Starknet’s scalability and security, we ensure low fees, fast transactions, and a transparent bidding experience."
      );
    } else {
      setImage("/svgs/stop-anti-against-abandon-gas-mask-word-graphic.svg");
      setTitle("The Next-Gen Auction & Collectible Marketplace on Starknet");
      setDescription("StarkBid offers an unparalleled experience.");
    }
  }, [pathname]);

  return (
    <>
      <div className="w-full min-h-screen h-screen flex items-stretch justify-between bg-background  overflow-hidden ">
        <div className="w-1/2 h-full relative hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${pathname}-${image}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={image}
                alt="auth-image"
                width={698}
                height={1024}
                className="w-full h-full object-cover"
              />
              <Image
                src={"/svgs/shadow.svg"}
                alt="shadow"
                width={698}
                height={1024}
                className="w-full h-full object-cover absolute top-0"
              />
            </motion.div>
          </AnimatePresence>

          <div className="w-full inset-1 absolute top-0 flex-col justify-end flex pb-8 left-0 px-7 z-10">
            <motion.div
              key="logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="top-10 absolute"
            >
              <Image
                src={"/svgs/logo-with-text.svg"}
                width={146}
                height={37}
                alt="logo"
              />
            </motion.div>

            <motion.h2
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl text-white"
            >
              {title}
            </motion.h2>

            <motion.p
              key={description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-medium text-xl text-white mt-3"
            >
              {description}
            </motion.p>
          </div>
        </div>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="lg:w-1/2 h-full w-full overflow-y-scroll"
        >
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </motion.div>
      </div>
      <Toaster />
    </>
  );
};

export default AuthLayout;
