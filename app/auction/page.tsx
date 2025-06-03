import Notification from "./components/notification";
import Navbar from "../../components/landing-page/Navbar";
import NftBid from "./components/nftbid";
const AuctionPage = () => {
    return ( 
        <div>
            <Notification/>
            <Navbar/>
            <NftBid/>
        </div>
     );
}
 
export default AuctionPage;