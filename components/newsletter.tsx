"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import stars from '../public/star.png'; // Adjust the path as necessary

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Add your submission logic here
            setSubmitted(true);
        }
    };

    return (
        <div className="bg-purple bg-cover rounded-[3rem] text-white relative overflow-hidden h-[35vh] flex items-center">
            {/* top star */}
            <Image src={stars} height={50} width={150} alt='stars' className='absolute top-[10px] right-3' />
            {/* bottom star */}
            <Image src={stars} height={50} width={150} alt='stars' className='absolute bottom-[-20px]' />
            <div className="mx-auto w-full px-[10rem]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    {/* Left content */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Stay in the loop</h2>
                        <p className="text-lg opacity-90 mb-6 w-[30rem]">
                            A hauntingly beautiful NFT series where glitchy, transparent
                            pixels form eerie digital ghosts and lost memories
                        </p>
                    </div>

                    {/* Right content - form */}
                    <div className="md:w-1/2">
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white text-black bg-opacity-25 backdrop-blur-sm px-6 py-4 placeholder-white placeholder-opacity-70 rounded-lg flex-grow border-none outline-none focus:ring-2 focus:ring-white"
                                />
                                <button
                                    type="submit"
                                    className="bg-white text-purple font-semibold px-8 py-4 hover:bg-opacity-90 transition-all rounded-lg duration-200"
                                >
                                    Subscribe
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white text-black bg-opacity-25 backdrop-blur-sm px-6 py-8 text-center">
                                <p className="text-xl font-semibold">Thank you for subscribing!</p>
                                <p className="mt-2 opacity-90">Stay tuned for updates on our NFT collection.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;