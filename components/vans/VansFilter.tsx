"use client"

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const VansFilter = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile filter toggle

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block md:hidden w-full text-center bg-gray-200 py-2 rounded-md font-semibold"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Container */}
      <div className={`${isOpen ? "block" : "hidden"} md:flex md:items-center md:justify-between md:space-x-4 mt-4 md:mt-0`}>
        
        {/* Van Type Filter */}
        <div className="flex flex-wrap gap-2">
          {["Simple", "Rugged", "Luxury"].map((type) => (
            <button
              key={type}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            >
              {type}
            </button>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min $"
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max $"
            className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Location Filter */}
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search city or country"
            className="pl-10 border border-gray-300 rounded-lg px-3 py-2 w-52 focus:outline-none"
          />
        </div>

        {/* Date Picker Filter */}
        <div>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default VansFilter;
