import CollectionsParent from "@/components/collections/collectionparent";
import Newsletter from "@/components/collections/newsletter";

export default function Home() {
  return (
    <div>
      <div className="w-full max-w-[1419] mx-auto text-white overflow-hidden">
        <CollectionsParent />
        <div className="bg-black pb-8">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
