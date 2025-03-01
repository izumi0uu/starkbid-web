import NFTCollectionsTable from "@/components/Collections";
import BiggestGaming from "@/components/BiggestGaming";
import Hero from "@/components/Hero";
import NotableCollections from "@/components/notablenft";
import NFTCategory from "@/components/nft-category";
import Newsletter from "@/components/Newsletter";
import TrendingSection from "@/components/TrendingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1216]">
      <main className="md:space-y-[100px]">
        <Hero />

        <NFTCategory />

        <NFTCollectionsTable />
        <div className="space-y-20">
          <BiggestGaming />
          <NotableCollections />
          <TrendingSection />
        </div>
        <Newsletter />
      </main>
    </div>
  );
}
