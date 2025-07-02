import ProfileHeader from "@/components/profile/profile-header";
import Footer from "@/components/collections/footer";
import Navbar from "@/components/landing-page/Navbar";
import CollectionTabs from "@/components/profile/profile-collections";

export default function Page() {

  const userProfile = {
    address: '0x9d863ed03...3ba8',
    username: 'Cattie Negtar',
  };

  const isOwner = true; 

  return (
    <div className="min-h-screen flex flex-col bg-[#101213]">
      <Navbar />
      <div className="flex-1 w-full text-white overflow-hidden">
        <ProfileHeader />
        <CollectionTabs />
      </div>
      <Footer />
    </div>
  );
}
