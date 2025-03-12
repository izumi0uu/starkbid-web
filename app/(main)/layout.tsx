import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";
import React from "react";
import { Fustat } from "next/font/google";

const futsat = Fustat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${futsat.className} flex flex-col `}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
