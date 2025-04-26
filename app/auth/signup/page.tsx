"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const signUpSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email address required" })
        .email("Please enter a valid email address"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });
    const router = useRouter();
    const onSubmit = (data: SignUpFormData) => {
        router.push("/auth/connect-wallet");
    };
    return (
        <>
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col items-center justify-start px-6 pt-20 md:w-4/5 md:mx-auto md:justify-center md:pt-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-left md:text-center lg:text-4xl">
                        Sign Up
                    </h1>
                    <p className="text-base text-ash text-left mt-4 md:text-center">
                        Please provide your email address to get started.
                    </p>
                </motion.div>

                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="w-full mt-4 flex flex-col">
                        <label
                            className="font-sm text-white font-normal text-left"
                            htmlFor="email-input"
                        >
                            Email Address <span className="text-purple">*</span>
                        </label>
                        <input
                            {...register("email")}
                            className={`outline-none mt-2 border-2 shadow-[#292929] placeholder:text-ash rounded-md text-ash text-sm p-3 bg-transparent font-normal ${errors.email ? "border-red" : "border-[#292929]"
                                }`}
                            placeholder="example@gmail.com"
                            id="email-input"
                            type="email"
                        />

                        {errors.email && (
                            <span className="text-red text-xs mt-2">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <motion.div
                        className="w-full mt-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <button className="w-full bg-purple text-white p-3 rounded-md">
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                router.push("/");
                            }}
                            className="w-full bg-deepGray text-ash p-3 rounded-md mt-5"
                        >
                            Continue as Guest
                        </button>

                        <p className="text-left text-ash text-sm font-normal mt-5 md:text-center">
                            Already have an account?{" "}
                            <span
                                onClick={() => {
                                    router.push("/auth/signin");
                                }}
                                className="text-purple cursor-pointer"
                            >
                                Sign In
                            </span>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.form>
        </>
    );
};

export default SignUp;
