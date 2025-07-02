import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PriceRange {
  min: string;
  max: string;
  currency: string;
}

interface PriceFilterProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

const currencies = [
  { label: 'ETH', value: 'ETH' },
  // Puedes agregar más monedas aquí
];

const PriceFilter: React.FC<PriceFilterProps> = ({ value, onChange }) => {
  const [local, setLocal] = useState(value);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setLocal(value);
    setChanged(false);
  }, [value]);

  useEffect(() => {
    setChanged(local.min !== value.min || local.max !== value.max);
  }, [local, value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };
  const handleCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocal({ ...local, currency: e.target.value });
  };
  const handleApply = () => {
    onChange(local);
  };

  return (
    <div>
      <div className="flex items-center mb-2 gap-2">
        <select
          className="w-full bg-[#23232A] border border-[#23232A] focus:border-[#8B5CF6] text-white rounded-[8px] px-3 py-2 focus:outline-none appearance-none pr-8 transition-colors"
          value={local.currency}
          onChange={handleCurrency}
        >
          {currencies.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <ChevronDown size={18} className="-ml-8 text-gray-400 pointer-events-none" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          name="min"
          placeholder="Min"
          value={local.min}
          onChange={handleInput}
          className="w-1/2 bg-[#23232A] border border-[#23232A] focus:border-[#8B5CF6] text-white rounded-[8px] px-3 py-2 focus:outline-none placeholder-gray-400 transition-colors"
        />
        <span className="text-gray-400">to</span>
        <input
          type="text"
          name="max"
          placeholder="Max"
          value={local.max}
          onChange={handleInput}
          className="w-1/2 bg-[#23232A] border border-[#23232A] focus:border-[#8B5CF6] text-white rounded-[8px] px-3 py-2 focus:outline-none placeholder-gray-400 transition-colors"
        />
      </div>
      <button
        className={`w-full rounded-[8px] py-2 mt-1 transition-colors text-white ${changed ? 'bg-[#8B5CF6] hover:bg-[#7c3aed]' : 'bg-[#23232A] opacity-50 cursor-not-allowed'}`}
        type="button"
        onClick={handleApply}
        disabled={!changed}
      >
        Apply
      </button>
    </div>
  );
};

export default PriceFilter; 