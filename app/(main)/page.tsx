import NFTCollectionsTable from "@/components/landing-page/TopNftCollections";
import BiggestGaming from "@/components/landing-page/BiggestGaming";
import Hero from "@/components/landing-page/Hero";
import NotableCollections from "@/components/landing-page/NotableCollections";
import NFTCategory from "@/components/landing-page/NftCategory";
import Newsletter from "@/components/landing-page/Newsletter";
import TrendingSection from "@/components/landing-page/TrendingGaming";
import { NFTLatestList } from "@/components/landing-page/NFTLatestList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1216]">
      <main className=" flex flex-col gap-20 px-4 sm">
        <Hero />

        <NFTLatestList />
        <NFTCategory />

        <NFTCollectionsTable />
        <BiggestGaming />
        <NotableCollections />
        <TrendingSection />
        <Newsletter />
      </main>
    </div>
  );
}
