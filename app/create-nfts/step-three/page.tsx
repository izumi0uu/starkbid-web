"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "@/components/create-nfts/common/BackButton";
import Image from "next/image";
import LazyBoysAvatar from "@/public/avatars/lazy-boys.svg";
import IceFletcherAvatar from "@/public/avatars/ice.png";
import UtopiaDreamsAvatar from "@/public/avatars/utopia.png";
import CreateCollectionModal from "./create-collection-modal";
import PaymentProcessingModal from "./payment-processing-modal";
import TransactionFailedModal from "./transaction-failed";

export default function AddToCollection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<{
    value: string;
    label: string;
    avatar: string;
    items: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isTransactionFailed, setIsTransactionFailed] = useState(false);

  const collections = [
    { value: "lazy-boys", label: "Lazy Boys Don't Lie", avatar: LazyBoysAvatar, items: "5,000 items" },
    { value: "ice-fletcher", label: "Ice Fletcher", avatar: IceFletcherAvatar, items: "5,000 items" },
    { value: "utopia-dreams", label: "Utopia Dreams", avatar: UtopiaDreamsAvatar, items: "5,000 items" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (collection) => {
    setSelectedCollection(collection);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCollection = (collectionData) => {
    // Handle the created collection data
    console.log(collectionData);
    // Add the new collection to the collections array
    collections.push({
      value: collectionData.url,
      label: collectionData.name,
      avatar: URL.createObjectURL(collectionData.coverPhoto),
      items: "0 items",
    });
    setSelectedCollection({
      value: collectionData.url,
      label: collectionData.name,
      avatar: URL.createObjectURL(collectionData.coverPhoto),
      items: "0 items",
    });
  };

  const handleNext = () => {
    if (selectedCollection) {
      setIsProcessingPayment(true);
      setTimeout(() => {
        setIsProcessingPayment(false);
        setIsTransactionFailed(true);
      }, 5000);
    }
  };

  const handleCloseTransactionFailed = () => {
    setIsTransactionFailed(false);
  };

  const handleRetry = () => {
    setIsTransactionFailed(false);
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      // Simulate a successful transaction after retrying
      // You can replace this with your actual transaction logic
      console.log("Transaction successful after retry");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-3xl font-bold mt-4">Add To Collection</h1>
        <p className="text-gray-400 mt-2">
          Please select the collection you want to add this NFT to or just create a new one.
        </p>

        <div className="mt-8 bg-gray-400/10 px-4 py-5 rounded-md">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple overflow-hidden">
              <Image
                src="/avatars/create-nft-pfp.png"
                alt="User avatar"
                width={60}
                height={60}
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center">
                <p className="text-base font-bold text-white">@radicaldude84</p>
              </div>
              <p className="text-base text-white font-semibold">352by_fc76</p>
            </div>
            <div className="ml-auto text-start">
              <span className="text-xs bg-green text-black px-2 py-0.5 rounded-full">
                Connected
              </span>
              <p className="text-sm text-gray-400">Ethereum Blockchain</p>
            </div>
          </div>
        </div>

        <div className="mt-6 relative">
          <div
            className="flex items-center justify-between bg-[#292929] border border-darkerGray rounded-md py-3 px-4 cursor-pointer"
            onClick={toggleDropdown}
          >
            {selectedCollection ? (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={selectedCollection.avatar}
                    alt={selectedCollection.label}
                    width={24}
                    height={24}
                  />
                </div>
                <span>{selectedCollection.label}</span>
                <span className="ml-auto text-gray-400">{selectedCollection.items}</span>
              </div>
            ) : (
              <span className="text-gray-400">Select...</span>
            )}
            <svg
              className={`h-4 w-4 text-gray-400 transition duration-300 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full bg-[#292929] border border-darkerGray rounded-md mt-2 py-2"
            >
              {collections.map((collection) => (
                <div
                  key={collection.value}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-10"
                  onClick={() => handleOptionClick(collection)}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={collection.avatar}
                      alt={collection.label}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span>{collection.label}</span>
                  <span className="ml-auto text-gray-400">{collection.items}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <p className="my-4 text-center text-gray-400">Or</p>

        <motion.button
          type="button"
          className="w-full bg-transparent border border-purple hover:border-purple text-purple hover:text-purple font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create New Collection (ERC-721)
        </motion.button>

        <CreateCollectionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreate={handleCreateCollection}
        />

        <motion.button
          type="submit"
          className="w-full bg-purple hover:bg-purple text-white font-medium py-3 px-4 rounded-md mt-8 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
        >
          Next
        </motion.button>
      </div>

      <PaymentProcessingModal
        isOpen={isProcessingPayment}
        onCancel={() => setIsProcessingPayment(false)}
        onClose={() => setIsProcessingPayment(false)}
      />

      <TransactionFailedModal
        isOpen={isTransactionFailed}
        onClose={handleCloseTransactionFailed}
        onRetry={handleRetry}
      />
    </div>
  );
}