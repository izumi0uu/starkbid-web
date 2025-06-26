import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

const CollectionProfile: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-x-4">
      <div className="w-32 h-32  rounded-2xl  flex items-center justify-center">
        <Image src={"/collectionProfile.png"} width={100} height={100} alt='' className='w-full h-full'/>
      </div>
      <div className="pt-6">
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-3xl font-bold">MonkeyMart</h1>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProfile;