import React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterCategoryProps {
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  onClear?: () => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ title, isOpen, onToggle, children, isActive, onClear }) => (
  <div className="mb-4">
    <button
      className="flex items-center justify-between w-full text-left text-white font-medium py-2 px-1 focus:outline-none"
      onClick={onToggle}
      aria-expanded={isOpen}
      type="button"
    >
      <span className="flex-1 flex items-center gap-2">
        {title}
        {isActive && onClear && (
          <button
            className="ml-2 text-white hover:text-[#8B5CF6] p-1 rounded-full border border-[#23232A] bg-[#23232A]"
            onClick={e => { e.stopPropagation(); onClear(); }}
            title="Clear this filter"
            type="button"
            tabIndex={0}
          >
            <X size={16} color="white" />
          </button>
        )}
      </span>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="mt-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default FilterCategory; 