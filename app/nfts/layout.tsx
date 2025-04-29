import React from 'react';
import Navbar from '@/components/landing-page/Navbar';
import Footer from '@/components/landing-page/Footer'; 
// import Newsletter from '@/components/collections/newsletter';
import Newsletter from '@/components/newsletter';
export const metadata = {
  title: 'NFT Marketplace',
  description: 'A marketplace for trending NFTs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Newsletter/>
        <Footer />
      </body>
    </html>
  );
}