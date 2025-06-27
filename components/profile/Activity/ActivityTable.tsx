import React from 'react';
import Image from 'next/image';
import { ActivityItem } from './Activity.types';

interface ActivityTableProps {
    data: ActivityItem[];
}

const ActivityTable: React.FC<ActivityTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto bg-transparent">
            <table className="min-w-full divide-y divide-[#2D2E32]">
                <thead className="bg-transparent">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            Items
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            Transaction Type
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            Price
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            Collection Number
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            QTY
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            From
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            To
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#8E9BAE]"
                        >
                            Date & Time
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#2D2E32] bg-transparent">
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 relative">
                                        <Image
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={item.itemImage}
                                            alt={item.itemName}
                                            width={40}
                                            height={40}
                                        />
                                        <div className="absolute bottom-0 right-0 transform translate-x-1 translate-y-1">
                                            <Image
                                                src="/starknet.png" 
                                                alt="Icon"
                                                width={16} 
                                                height={16} 
                                                className="rounded-full bg-[#1C1D1F] p-[2px]" 
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-white">
                                            {item.itemName}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                {item.transactionType}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                {item.price} <span className='text-[#8E9BAE]'> {item.currency} </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                {item.collectionNumber}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                {item.qty}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                {item.from}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                {item.to}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                                <div>{item.timeAgo}</div>
                                <div className='text-[#A3A3A3]'>{item.date}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityTable;