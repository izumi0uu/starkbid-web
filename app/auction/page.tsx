import Notification from "./components/notification";
import Navbar from "../../components/landing-page/Navbar";
import NftBid from "./components/nftbid";
import Footer from "@/components/landing-page/Footer";
import NFTCollectionSection from "./components/nft_collection_card_data";

const AuctionPage = () => {
    return ( 
        <div>
            <Notification/>
            <Navbar/>
            <NftBid/>
            <NFTCollectionSection />
            <Footer />
        </div>
     );
}
 
export default AuctionPage;