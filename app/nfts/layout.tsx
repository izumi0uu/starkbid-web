import React from 'react';
import Navbar from '@/components/landing-page/Navbar';
import Footer from '@/components/landing-page/Footer'; 
export const metadata = {
  title: 'NFT Marketplace',
  description: 'A marketplace for trending NFTs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white container mx-auto">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}