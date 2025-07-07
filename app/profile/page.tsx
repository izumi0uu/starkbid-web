import ProfileHeader from "@/components/profile/profile-header";
import Footer from "@/components/collections/footer";
import Navbar from "@/components/landing-page/Navbar";
import CollectionTabs from "@/components/profile/profile-collections";
import { Suspense } from "react";

export default function Page() {

  return (
    <div className="min-h-screen flex flex-col bg-[#101213]">
      <Navbar />
      <div className="flex-1 w-full text-white overflow-hidden">
        <ProfileHeader />
        <Suspense fallback={<div className="p-6">Loading...</div>}>
          <CollectionTabs />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
