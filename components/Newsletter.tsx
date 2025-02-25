"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
        <div className="bg-[#6C45C5] rounded-[20px] p-6 sm:p-10 md:p-16 text-white">
            <div className="mb-2">
                <h3 className="font-bold text-xl md:text-[35px] text-center lg:text-left leading-tight">Stay in the loop</h3>
            </div>
            
            {/* Restructured layout for better responsiveness */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:gap-[10vw] xl:gap-[18vw]">
                <p className="w-full text-sm md:text-base font-semibold mb-6 lg:mb-0 text-center lg:text-left">A hauntingly beautiful NFT series where glitchy, transparent pixels form eerie digital ghosts and lost memories</p>
                
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
  )
}