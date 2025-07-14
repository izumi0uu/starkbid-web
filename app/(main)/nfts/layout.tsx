import React from 'react';
export const metadata = {
  title: 'NFT Marketplace',
  description: 'A marketplace for trending NFTs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white container mx-auto">{children}</div>
  );
}
