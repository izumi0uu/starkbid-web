import CollectionsParent from "@/components/collections/collectionparent";
import Footer from "@/components/collections/footer";
import Navbar from "@/components/landing-page/Navbar";
import Newsletter from "@/components/collections/newsletter";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="w-full text-white overflow-hidden">
        <CollectionsParent />
        <div className="bg-black pb-8">
          <Newsletter />
        </div>
        <Footer />
      </div>
    </div>
  );
}