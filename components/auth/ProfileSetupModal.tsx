"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface AnimatedModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

const ProfileSetUpModal: React.FC<AnimatedModalProps> = ({
    openModal,
    setOpenModal,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setOpenModal(false);
        }
    };

    const router = useRouter();
    useEffect(() => {
        if (openModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openModal]);

    return (
        <AnimatePresence>
            {openModal && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                >
                    <motion.div
                        className="relative bg-deepGray rounded-2xl w-full max-w-[583px] p-6 shadow-xl"
                        variants={modalVariants}
                        ref={modalRef}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setOpenModal(false)}
                        >
                            <X size={20} />
                        </button>

                        <div className="w-[3/5] bg-deepGray " >
                            <Image src={'/svgs/confettie.svg'} width={100} height={50} alt="confettie" className="mx-auto" />
                            <p className="text-white text-center text-xl lg:text-2xl mt-7 font-semibold" >Wallet Set!</p>
                            <p className="text-ash text-center text-sm lg:text-base mt-2 font-bold" >Congratulations! your profile has been successfully set</p>
                            <button
                                onClick={() => {
                                    router.push("/")
                                }}
                                type="submit"
                                className="w-full bg-purple text-white p-3 rounded-md mt-9 "
                            >
                                Go to Home
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileSetUpModal;
