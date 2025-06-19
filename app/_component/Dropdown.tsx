// app/components/Dropdown.tsx
"use client";

import { useState } from "react";

type DropdownOption = {
  id: number;
  username: string;
};

type DropdownProps = {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  label?: string;
};

export default function Dropdown({ options, onSelect, label }: DropdownProps) {
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);

  const handleSelect = (option: any) => {
    setSelected(option.username);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block mb-10 text-left">
      {label && (
        <label className="block mb-1 text-sm font-medium text-white">
          {label}
        </label>
      )}
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
        >
          {selected}
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            >
              {option.username}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
