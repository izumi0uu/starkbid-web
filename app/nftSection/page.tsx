import type { NextPage } from 'next';
import NFTSalesSlider from "@/components/nftC/NFTSalesSlider";
import Frame1 from "@/public/Frame5.png";
import Frame2 from "@/public/Frame6.png";
import Frame3 from "@/public/Frame7.png";
import Frame4 from "@/public/Frame8.png"

const sampleData = [
  {
    id: '1',
    title: 'Birds of Damascus',
    image: Frame1,
    floorPrice: '0.12 ETH',
    totalVolume: '207 ETH'
  },
  {
    id: '2',
    title: 'Birds of Damascus',
    image: Frame2,
    floorPrice: '0.12 ETH',
    totalVolume: '207 ETH'
  },
  {
    id: '3',
    title: 'Birds of Damascus',
    image: Frame3,
    floorPrice: '0.12 ETH',
    totalVolume: '207 ETH'
  },
  {
    id: '4',
    title: 'Birds of Damascus',
    image: Frame4,
    floorPrice: '0.12 ETH',
    totalVolume: '207 ETH'
  },

  {
    id: '5',
    title: 'Birds of Damascus',
    image: Frame2,
    floorPrice: '0.12 ETH',
    totalVolume: '207 ETH'
  },
 
];

const Home: NextPage = () => {
  return (
    <div>
      <NFTSalesSlider sales={sampleData} />
    </div>
  );
};

export default Home;
