
import TrendingGaming from "@/components/TrendingGaming";
import Hero from "@/components/Hero";

import NotableCollections from "@/components/notablenft"

import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1216]">
      <main className="">
        <Hero />

        <NotableCollections />

        <TrendingGaming/>
        <Newsletter />

      </main>
    </div>
  );
}
