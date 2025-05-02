import React from "react";
import Navbar from "@/components/landing-page/Navbar";
import Footer from "@/components/landing-page/Footer";
import { Nunito_Sans } from "next/font/google";
import ProgressBar from "@/components/create-nfts/common/WithdrawStepsProgressbar";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Create NFTs",
  description: "A marketplace for trending NFTs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${nunito.className} bg-black text-white container mx-auto`}>
      <Navbar />
      <ProgressBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
