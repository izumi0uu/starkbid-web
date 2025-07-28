import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
  Copy,
  Globe,
  Instagram,
  MessageCircle,
  Send,
  Edit,
} from "lucide-react";
import Image from "next/image";

export default function ProfileHeader() {
  return (
    <div className=" bg-gradient-to-b from-purple via-[#101213] to-[#101213]">
      <Card className="max-w-[1440px] mx-auto py-6 border-none rounded-none bg-transparent">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Profile */}
            <div className="space-y-6">
              <div className="flex flex-col items-start space-y-4">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <Image
                    src="/avatars/avatar-2.svg"
                    width={150}
                    height={150}
                    className="w-28 h-auto"
                    alt="StarkBid logo"
                  />
                </Avatar>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold text-white">
                        Cattie Negtar
                      </h1>
                      <Image
                        src="/verified.png"
                        width={30}
                        height={30}
                        className="w-[30px] h-auto"
                        alt="StarkBid logo"
                      />
                    </div>
                    <p className="text-gray-400 font-mono text-sm">
                      0x9d863ed03...3ba8
                    </p>
                  </div>
                  <div className="flex p-4 justify-center items-center hover:bg-white/10 text-white rounded-sm gap-2 border-2 border-darkerGray">
                    <p className="text-sm font-semibold">Edit Profile</p>
                    <Edit className="w-[18px] h-[18px]" />
                  </div>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-sm">Share</span>
                    <Share2 className="w-4 h-4" />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Globe className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Network Badges */}
              <div className="flex gap-4">
                <Badge className="bg-[#1C1D1F] text-white rounded-[9px] p-3">
                  Ethereum
                  <Image
                    src="/svgs/mdi_ethereum.svg"
                    width={16}
                    height={16}
                    className="w-4 h-auto ml-2"
                    alt="Ethereum logo"
                  />
                </Badge>
                <Badge className="bg-[#1C1D1F] text-white rounded-[9px] p-3">
                  Starknet
                  <Image
                    src="/svgs/token_starknet.svg"
                    width={16}
                    height={16}
                    className="w-4 h-auto ml-2"
                    alt="Starknet logo"
                  />
                </Badge>
                <Badge className="text-gray-400 bg-[#1C1D1F] rounded-[9px] text-sm">
                  Date joined <span className="text-white"> May 15, 2025</span>
                </Badge>
              </div>
            </div>

            {/* Right Section - Stats */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2 border-r border-dashed border-[#8E9BAE] pr-6">
                  <p className="text-[#8E9BAE] text-sm">Total Value</p>
                  <p className="text-white text-2xl font-bold">0.00 ETH</p>
                </div>
                <div className="text-center space-y-2 border-r border-dashed border-[#8E9BAE] pr-6">
                  <p className="text-[#8E9BAE] text-sm">Total Value(USD)</p>
                  <p className="text-white text-2xl font-bold">$0.00</p>
                </div>
                <div className="text-center space-y-2 border-r border-dashed border-[#8E9BAE] pr-6">
                  <p className="text-[#8E9BAE] text-sm">Owned Items</p>
                  <p className="text-white text-2xl font-bold">0</p>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-[#8E9BAE] text-sm">Collections</p>
                  <p className="text-white text-2xl font-bold">0</p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Bio</h3>
                <div className="">
                  <p className="text-gray-500 text-sm">__________</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
