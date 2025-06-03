import Image from "next/image";
import calendar from "../../../public/calender.png";
import discord from "../../../public/discord.png";
import arrow from "../../../public/arrow-up.png";

const Notification = () => {
    return ( 
        <div className="bg-[#8C62F2] px-2 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image src={calendar} alt="calendar" width={20} height={20} />
                <p className="text-white text-sm">Next NFT Quest ends 16/05/2025 10am ET</p>
            </div>
            <div className="flex items-center gap-6">
                <Image src={discord} alt="discord" width={20} height={20} />
                <p className="text-white text-sm">Open Discord</p>
                <Image src={arrow} alt="arrow" width={20} height={20} />
            </div>
        </div>
     );
}
 
export default Notification;