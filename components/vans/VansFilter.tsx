"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const VansFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile filter toggle

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const currentPath = usePathname();
  const router = useRouter();

  const handleTypeFilter = (vanType: string): void => {
    params.append("type", vanType);
    router.push(`${currentPath}?${params.toString()}`);
  };

  const handleMinFilter = useDebouncedCallback((value: string) => {
    if (value) {
      params.set("min", value.toString());
    } else params.delete("min");

    router.push(`${currentPath}?${params.toString()}`);
  }, 250);

  const handleMaxFilter = useDebouncedCallback((value: string) => {
    if (value) {
      params.set("max", value.toString());
    } else params.delete("max");

    router.push(`${currentPath}?${params.toString()}`);
  }, 250);

  const handleLocationFilter = useDebouncedCallback((value: string) => {
    if (value) {
      params.set("city", value.toString());
      params.set("country", value.toString());

    } else {
        params.delete("city");
        params.delete("country")};

    router.push(`${currentPath}?${params.toString()}`);
  }, 250);

  const handleAvailabilityFilter = (value: string) => {
    if (value) {
      params.set("date", value.toString());
    } else params.delete("date");

    router.push(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full rounded-md bg-gray-200 py-2 text-center font-semibold md:hidden"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Container */}
      <div
        className={`${isOpen ? "block" : "hidden"} mt-4 md:mt-0 md:flex md:items-center md:justify-between md:space-x-4`}
      >
        {/* Van Type Filter */}
        <div className="flex flex-wrap gap-2">
          {["Simple", "Rugged", "Luxury"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type.toLowerCase())}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            >
              {type}
            </button>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => handleMinFilter(e.target.value)}
            type="number"
            placeholder="Min $"
            className="w-20 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
          <span>-</span>
          <input
            onChange={(e) => handleMaxFilter(e.target.value)}
            type="number"
            placeholder="Max $"
            className="w-20 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Location Filter */}
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            onChange={(e) => handleLocationFilter(e.target.value)}
            type="text"
            placeholder="Search city or country"
            className="w-52 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:outline-none"
          />
        </div>

        {/* Date Picker Filter */}
        <div>
          <input
          onChange={(e) => handleAvailabilityFilter(e.target.value)}
            type="date"
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default VansFilter;
