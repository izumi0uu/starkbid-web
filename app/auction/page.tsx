import Navbar from "../../components/landing-page/Navbar";
import NftBid from "./components/NFTDetail";
import Footer from "@/components/landing-page/Footer";
import NFTCollectionSection from "./components/nft_collection_card_data";

const AuctionPage = () => {
    return (
        <div className="max-w-[1320px] mx-auto">
            <Navbar/>
            <NftBid/>
            <NFTCollectionSection />
            <Footer />
        </div>
     );
}

export default AuctionPage;
