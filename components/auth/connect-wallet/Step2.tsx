"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileSetUpModal from "../ProfileSetupModal";
import { useAccount } from "@starknet-react/core";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  avatar: z.string().min(1, "Please select an avatar"),
});

type FormValues = z.infer<typeof schema>;

const Step2 = () => {
  const { address } = useAccount();
  const Avatars = [
    { icon: "/avatars/main-avatar.svg" },
    { icon: "/avatars/avatar-1.svg" },
    { icon: "/avatars/avatar-2.svg" },
    { icon: "/avatars/avatar-3.svg" },
    { icon: "/avatars/avatar-4.svg" },
    { icon: "/avatars/avatar-5.svg" },
    { icon: "/avatars/avatar-6.svg" },
    { icon: "/avatars/avatar-7.svg" },
    { icon: "/avatars/avatar-8.svg" },
  ];

  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      avatar: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    setOpenModal(true);
  };

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
    setValue("avatar", avatar);
  };
  const username = watch("username");
  const avatar = watch("avatar");

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-start pt-10 md:w-4/5 md:mx-auto md:justify-center md:pt-12"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={containerVariants}
      >
        <motion.div className="w-full" variants={fadeInUp}>
          <h1 className="text-3xl font-bold text-left md:text-center lg:text-4xl lg:text-left">
            Set Up Your Profile
          </h1>
          <p className="text-base text-ash text-left mt-4 md:text-center lg:text-left">
            Please pick an avatar and select a username to continue with
            StarkBid.
          </p>
        </motion.div>

        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4 mt-8">
          <div className="w-full lg:w-2/5">
            <motion.div className="w-full" variants={fadeInUp}>
              <Image
                src={selectedAvatar || avatar || "/profile-placeholder.png"}
                width={125}
                height={125}
                alt="avatar"
                className="object-contain mx-auto rounded-full"
              />
            </motion.div>

            <motion.p
              className="text-lg text-white font-semibold mt-3 text-center truncate w-auto"
              variants={fadeInUp}
            >
              {address}
            </motion.p>

            <motion.p
              className="text-base font-medium text-purple mt-3 text-center truncate"
              variants={fadeInUp}
            >
              {username}
            </motion.p>
          </div>

          <div className="w-full lg:w-3/5 flex items-center justify-center md:justify-start flex-wrap">
            {Avatars.map(({ icon }, index) => (
              <motion.div
                key={index}
                className={`w-1/3 my-2 cursor-pointer p-1 rounded ${
                  selectedAvatar === icon ? "  ring-purple" : ""
                }`}
                onClick={() => handleAvatarClick(icon)}
                variants={fadeInUp}
              >
                <Image
                  src={icon}
                  width={75}
                  height={75}
                  alt="avatar"
                  className="object-contain mx-auto rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {errors.avatar && (
          <p className="text-red text-xs text-left w-full mt-2">
            {errors.avatar.message}
          </p>
        )}

        <div className="w-full flex flex-col mb-6 mt-10">
          <label
            className="font-sm text-white font-normal text-left"
            htmlFor="username-input"
          >
            Username <span className="text-purple">*</span>
          </label>
          <input
            {...register("username")}
            className="mt-2 border-2 shadow-[#292929] placeholder:text-ash rounded-md text-ash text-sm p-3 bg-transparent font-normal border-[#292929] outline-none"
            placeholder="radicaldude84"
            id="username-input"
          />
          {errors.username && (
            <p className="text-red text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        <motion.div className="w-full pb-24" variants={fadeInUp}>
          <button
            type="submit"
            className="w-full bg-purple text-white p-3 rounded-md"
          >
            Set Up Profile
          </button>
        </motion.div>
      </motion.form>

      <ProfileSetUpModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Step2;
