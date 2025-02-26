import Hero from "@/components/Hero";
import NFTCategory from "@/components/nft-category";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1216]">
      <main className="">
        <Hero />
        <NFTCategory />
      </main>
    </div>
  );
}
