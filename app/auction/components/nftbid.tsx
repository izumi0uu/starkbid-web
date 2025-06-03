import Image from "next/image";
import frank_nft from "../../../public/frank_ocean.png";
import jacknft from "../../../public/jack-icon.png";
import verifiedicon from "../../../public/verified.png";
import likeicon from "../../../public/like-icon.png";
import creator from "../../../public/creator_nft.png"
import owner from "../../../public/new_owner.png"
import right_arrow from "../../../public/right-arrow.png"
import share from "../../../public/share.png"
import web from "../../../public/web.png"

const NftBid = () => {
    return (
        <div className="px-10 pt-10 flex gap-20 items-start">
            <div className="basis-[60%] h-[638px]"> {/* Add explicit height */}
                <Image
                    src={frank_nft}
                    alt="frant_ocean_nft"
                    width={300}
                    height={600}
                    className="w-full h-full"
                />
            </div>


            <div className="basis-[40%]">
                <div className="flex justify-between basis-[50%]">
                    <div className="flex items-center gap-2">
                        <Image src={jacknft} alt="nftplaceholder" width={40} height={40} />
                        <p>Jacksonito</p>
                        <Image src={verifiedicon} alt="nftplaceholder" width={20} height={20} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Image src={likeicon} alt="likeicon" width={30} height={30} />
                        <p>56</p>
                    </div>
                </div>

                <p className="text-white text-3xl font-bold tracking-wide py-6">OceanFrank#3001</p>

                <div className="flex justify-between bg-[#1C1D1F] rounded-lg p-4">
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-400 text-sm">Current Bid Price</p>
                        <p className="text-2xl font-semibold">0.023 ETH</p>
                        <p className="text-gray-400 text-sm">$90</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-gray-400 text-sm">Top Offer</p>
                        <p className="text-2xl font-semibold">1.23 ETH</p>
                        <p className="text-gray-400 text-sm">$290</p>
                    </div>
                </div>

                <p className="text-sm text-gray-400 flex justify-center py-6"><span>Sales deadline | </span> 1d 9h left</p>

                <div className="flex justify-between items-center border-y py-6 border-[#292929]">
                    <div className="flex items-center gap-6">
                        <Image src={creator} alt="" width={60} height={60} />
                        <div>
                            <p className="text-lg tracking-wider">x0023y...yrte</p>
                            <p className="text-gray-400 text-sm tracking-wider">Creator</p>
                        </div>
                    </div>

                    <div>
                        <Image src={right_arrow} alt="rightarrow" width={15} height={15} />
                    </div>

                    <div className="flex items-center gap-6">
                        <Image src={owner} alt="" width={60} height={60} />
                        <div>
                            <p className="text-lg tracking-wider">x0023y...yrte</p>
                            <p className="text-gray-400 text-sm tracking-wider">New Owner</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8 py-6 border-b border-[#292929]">
                    <div className="flex items-center gap-2">
                        <p>Share</p>
                        <Image src={share} alt="share" width={25} height={25} />
                    </div>
                    <Image src={web} alt="web" width={25} height={25} />
                </div>


                <button className="bg-[#8C62F2] w-full py-4 rounded-xl my-2">Buy Now</button>
                <button className="bg-[#1C1D1F] w-full py-4 rounded-xl my-2">Place a Bid</button>


            </div>
        </div>
    );
}

export default NftBid;