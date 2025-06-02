/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import Image from 'next/image'
import { Pencil } from 'lucide-react';

interface Props { data: any; onEdit: () => void; }
const CreateNFTSection: FC<Props> = ({ data, onEdit }) => (
    <section className="bg-[#1C1D1F] rounded-lg px-2 py-2.5 mb-4">
        <div className="flex justify-between items-center bg-[#29292A] rounded-lg m-1 p-3">

            <div className="flex flex-col">
                <h2 className="text-[30px] font-bold text-white">
                    Create NFT
                </h2>
                <p className="text-[#8E9BAE] text-[14px] mt-1 whitespace-normal break-words">
                    Please fill in appropriate information to continue. Note that once your item is <br /> minted you will not be able to change any of its information.
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

        <div className="mt-6 mx-3 space-y-2">
            <p className="flex justify-between">
                <span className="font-semibold text-[#8E9BAE] text-[16px]">NFT Name <span className='text-[#8C62F2]'>*</span> </span>
                <span className='text-[16px]'>{data.nftName}</span>
            </p>
            <p className="flex justify-between">
                <span className="font-semibold text-[#8E9BAE] text-[16px]">Supply/Royalties <span className='text-[#8C62F2]'>*</span> </span>
                <span className='text-[16px]'>{data.royalties}</span>
            </p>
            <p className="flex justify-between">
                <span className="font-semibold text-[#8E9BAE] text-[16px]">Description (optional) </span>
                <span className='text-[16px]'> {data.description && (
                    <p className="mt-2 text-white text-16px mb-6">{data.description}</p>
                )}</span>
            </p>

            <Image width={1310} height={282} src={data.previewImage} alt="preview" className="object-cover rounded-md" />
        </div>
    </section>
);

export default CreateNFTSection;