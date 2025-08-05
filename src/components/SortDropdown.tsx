import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ options, value, onChange }) => {
  return (
    <div className="relative text-gray-500 focus-within:text-gray-700">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pr-8 pl-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

export default SortDropdown;


