import NFTCollectionsTable from "@/components/Collections";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1216]">
      <main className="md:space-y-[100px]">
        <Hero />
        <NFTCollectionsTable/>
        <Newsletter />
      </main>
    </div>
  );
}
