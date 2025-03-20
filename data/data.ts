import Birds from "@/public/Birds.png";
import BitcoinPuppets from "@/public/BitcoinPuppets.png";
import CommanderDoug from "@/public/CommanderDoug.png";
import FlorianTUK from "@/public/FlorianTUK.png";
import Unchanted from "@/public/images/Unchanted.png";
import Uzumaki from "@/public/images/Uzumaki.png";

export const links = {
  Marketplace: ["Art", "Gaming", "Membership", "PFPs", "Photography", "Music"],
  Resources: [
    "Support",
    "API",
    "Blog",
    "Partners",
    "Explore",
    "Sitemap",
    "Terms of Service",
    "Privacy Policy",
    "Copyright",
  ],
  Company: ["About", "Careers", "Ventures"],
  "Follow us": ["X", "Discord", "Instagram", "Youtube"],
};

export const mockData = [
  {
    id: 1,
    name: "Xenos",
    image: "/images/nft1.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "+20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
  {
    id: 2,
    name: "Bored Apes",
    image: "/images/nft2.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "-20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
  {
    id: 3,
    name: "Monalissa",
    image: "/images/nft3.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "-20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
  {
    id: 4,
    name: "Bad BUNNIEZ",
    image: "/images/nft4.svg",
    verified: true,
    floorPrice: "35 ETH",
    volume: "200 ETH",
    topOffer: "31 ETH",
    floorChange: "-20.40%",
    sales: "150",
    holdersPercent: "45%",
    holdersTotal: "2054/4501",
  },
];

export const slides = [
  {
    id: 1,
    title: "Rarity Spectrum",
    description:
      "A color-coded NFT project where each artwork’s rarity is determined by its unique hue combinations and metadata traits.",
    image: "/images/hero-image.png",
    bid: "0.125ETH",
  },
  {
    id: 2,
    title: "Unique Artworks",
    description:
      "Discover unique artworks with distinct metadata traits in our exclusive collection.",
    image: "/images/hero-image.png",
    bid: "0.15ETH",
  },
  {
    id: 3,
    title: "Unique Artworks",
    description:
      "Discover unique artworks with distinct metadata traits in our exclusive collection.",
    image: "/images/hero-image.png",
    bid: "0.15ETH",
  },
  {
    id: 4,
    title: "Unique Artworks",
    description:
      "Discover unique artworks with distinct metadata traits in our exclusive collection.",
    image: "/images/hero-image.png",
    bid: "0.15ETH",
  },
];

export const originalCollections = [
  {
    id: 1,
    name: "Daki Da",
    floorPrice: '0.12',
    totalVolume: '207',
    image: '/images/Frame1.png',
  },
  {
    id: 2,
    name: "Birds of Damascus",
    floorPrice: '0.12',
    totalVolume: '207',
    image: '/images/Frame2.png',
  },
  {
    id: 3,
    name: "Birds of Damascus",
    floorPrice: '0.12',
    totalVolume: '207',
    image: '/images/Frame3.png',
  },
  {
    id: 4,
    name: "Birds of Damascus",
    floorPrice: '0.12',
    totalVolume: '207',
    image: '/images/Frame4.png',
  },
  {
    id: 5,
    name: "Birds of Damascus",
    floorPrice: '0.12',
    totalVolume: '207',
    image: '/images/Frame2.png',
  },
  {
    id: 6,
    name: "Birds of Damascus",
    floorPrice: '0.12',
    totalVolume: '207',
    image: '/images/Frame4.png',
  },
];

export const notableCollections = [
  {
    id: 1,
    name: "Daki Da",
    floorPrice: "0.12",
    totalVolume: "207",
    image: "/images/nft1.png",
  },
  {
    id: 2,
    name: "Birds of Damascus",
    floorPrice: "0.12",
    totalVolume: "207",
    image: "/images/nft2.png",
  },
  {
    id: 3,
    name: "Birds of Damascus",
    floorPrice: "0.12",
    totalVolume: "207",
    image: "/images/nft3.png",
  },
  {
    id: 4,
    name: "Birds of Damascus",
    floorPrice: "0.12",
    totalVolume: "207",
    image: "/images/nft4.png",
  },
  {
    id: "5",
    name: "Birds of Damascus",
    floorPrice: "0.12",
    totalVolume: "207",
    image: "/images/nft5.jpeg",
  },
];

export const nftData = [
  {
    id: 1,
    imageUrl: Birds,
    title: "Birds of Damascus",
    category: "AUCTION",
  },
  {
    id: 2,
    imageUrl: BitcoinPuppets,
    title: "Bitcoin Puppets",
    category: "COLLECTIONS",
  },
  {
    id: 3,
    imageUrl: CommanderDoug,
    title: "Commander Doug",
    category: "LAUNCHPAD",
  },
  {
    id: 4,
    imageUrl: FlorianTUK,
    title: "Florian TUK",
    category: "HOT COLLECTION",
  },
  {
    id: 5,
    imageUrl: Unchanted,
    title: "Unchanted",
    category: "HOT COLLECTION",
  },
  {
    id: 6,
    imageUrl: Uzumaki,
    title: "Uzumaki",
    category: "HOT COLLECTION",
  },
];

export const TrendingCollections = [
  {
    id: 1,
    name: "Daki Da",
    image: "/nft-collection/DakiDa.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 2,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 3,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus2.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 4,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus3.svg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
  {
    id: 5,
    name: "Birds of Damascus",
    image: "/nft-collection/damascus4.jpeg",
    floorPrice: "0.12 ETH",
    totalVolume: "207 ETH",
  },
];
