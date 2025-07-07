import React from 'react';

type Status = 'all' | 'listed' | 'owned_by_you';  

interface StatusFilterProps {
  value: Status;
  onChange: (value: Status) => void;
}

const options = [
  { label: 'All', value: 'all' },
  { label: 'Listed', value: 'listed' },
  { label: 'Owned by you', value: 'owned_by_you' },
];

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => (
  <div className="flex gap-2 items-center">
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`px-4 py-2 rounded-[9px] border-2 text-sm font-medium transition-colors
            ${value === opt.value
              ? 'bg-[#2E2256] border-[#8B5CF6] text-white'
              : 'bg-[#23232A] border-[#23232A] text-gray-200 hover:border-[#8B5CF6]'}
          `}
          onClick={() => onChange(opt.value as Status)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>

  </div>
);

export default StatusFilter; 