/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';


interface Props {
  data: any;
  onEdit: () => void;
}

const ChooseBlockchainSection: FC<Props> = ({ data, onEdit }) => (
  <section className="bg-[#1C1D1F] rounded-lg px-2 py-2.5 mb-4">
    <div className="flex justify-between items-center bg-[#29292A] rounded-lg m-1 p-3">

      <div className="flex flex-col">
        <h2 className="text-[30px] font-bold text-white">
          Choose Blockchain
        </h2>
        <p className="text-[#8E9BAE] text-[14px] mt-1">
          Please choose a blockchain to continue
        </p>
      </div>

      <button
        className="flex items-center space-x-1 text-sm text-purple-400 bg-[#1C1D1F] px-3 py-1.5 rounded-lg"
        onClick={onEdit}
      >
        <Pencil className="w-4 h-4" />
        <span>Edit</span>
      </button>
    </div>


    <div className="flex items-center justify-between mt-6">

      <div className="flex items-center space-x-3">

        <div className="relative w-[70px] h-[70px]">
          <Image
            src="/icon9.png"
            alt="avatar"
            width={70}
            height={70}
            className="w-full h-full rounded-full"
          />
          <Image
            src="/eth.png"
            alt="eth"
            width={16}
            height={16}
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-white text-[16px]">@radicaldude84</span>
          <span className="text-white text-[16px]">{data.wallet}</span>
        </div>
      </div>


      <div className="flex flex-col items-end space-y-2 mr-2">
        <span className="bg-[#2DCC7026] text-[#19B360] rounded-full px-3 py-1 text-[14px]">
          Connected
        </span>
        <span className="text-white text-[16px]">
          {data.blockchain} Blockchain
        </span>
      </div>
    </div>

  </section>
);

export default ChooseBlockchainSection;