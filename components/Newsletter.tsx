"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { BlNewsletterBg, TrNewsletterBg } from "@/public/images"
import Image from "next/image"

const formSchema = z.object({
    email: z.string().email("Enter your email address"),
})

export default function Newsletter() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })
    
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Subscribed:", values.email)
        reset()
      }
  return (
    <div className="w-full px-4 md:px-10 xl:px-20 py-6 lg:py-8">
        <div className="bg-[#6C45C5] rounded-[20px] p-6 sm:p-10 md:p-16 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0">
                <Image src={TrNewsletterBg} alt="bottom left background decoration" />
            </div>
            
            <div className="absolute bottom-0 left-0">
                <Image src={BlNewsletterBg} alt="bottom left background decoration" />
            </div>

            <div className="relative z-10">
                <div className="mb-4 md:mb-6">
                    <h3 className="font-bold text-2xl md:text-[35px] leading-tight md:leading-[50px]">Stay in the loop</h3>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:gap-[10vw] xl:gap-[18vw]">
                    <p className="w-full text-base font-semibold mb-4 lg:mb-0">A hauntingly beautiful NFT series where glitchy, transparent pixels form eerie digital ghosts and lost memories</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="flex flex-row gap-2.5">
                            <div className="flex-grow">
                                <input
                                    {...register("email")}
                                    placeholder="Enter your Email address"
                                    aria-label="Email subscription"
                                    className="font-semibold text-xs md:text-sm w-full px-2.5 py-3 bg-[#D5D7DA50] border-none text-white placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-[#7C3AED] rounded-lg"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1" role="alert">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="py-3 px-2.5 h-fit bg-white text-[#414651] text-xs md:text-sm hover:bg-gray-100 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] font-medium md:font-bold whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}