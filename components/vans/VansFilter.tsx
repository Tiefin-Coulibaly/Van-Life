"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const VansFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile filter toggle
  const [isTypeFiltered, setIsTypeFiltered] = useState(false);
  const [hasAnyFilter, setHasAnyFilter] = useState(false)
  console.log(`hasAnyfilter:${hasAnyFilter}`)

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
      params.delete("country");
    }

    router.push(`${currentPath}?${params.toString()}`);
  }, 250);

  const handleAvailabilityFilter = (value: string) => {
    if (value) {
      params.set("date", value.toString());
    } else params.delete("date");

    router.push(`${currentPath}?${params.toString()}`);
  };

  const handleTypeClearFilter = () => {
    params.delete("type");
    router.push(`${currentPath}?${params.toString()}`);
  };

  const handleClearAllFilters = ()=>{
    const params = new URLSearchParams(); // ✅ Resets params to an empty object
    router.push(`${currentPath}?${params.toString()}`); // Updates the URL
  }

  const toggleClearAllFilter = () => {
    if ([...params.keys()].length > 0) {
      setHasAnyFilter(true);
    } else {
      setHasAnyFilter(false);
    }
  };

  useEffect(()=>{
    toggleClearAllFilter()
  }, [[...params.keys()].length || 0])

  const toggleTypeClearFilter = (value: string) => {
    if (params.get(value)) {
      setIsTypeFiltered(true);
    } else setIsTypeFiltered(false);
  };
  useEffect(() => {
    toggleTypeClearFilter("type");
  }, [params.get("type")]);

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
        <div className="flex flex-wrap items-end gap-2">
          {["Simple", "Rugged", "Luxury"].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type.toLowerCase())}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            >
              {type}
            </button>
          ))}
          {isTypeFiltered && (
            <p
              className="ml-2 cursor-pointer text-sm text-red-500 underline underline-offset-2 transition-all hover:text-red-700"
              onClick={handleTypeClearFilter}
            >
              ✖ Clear type filter
            </p>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => handleMinFilter(e.target.value)}
            type="number"
            placeholder="Min $"
            defaultValue={params.get("min")?.toString()}
            className="w-20 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
          <span>-</span>
          <input
            onChange={(e) => handleMaxFilter(e.target.value)}
            type="number"
            placeholder="Max $"
            defaultValue={params.get("max")?.toString()}
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
            defaultValue={params.get("city")?.toString()}
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
        {/* Clear All Filters */}
        {hasAnyFilter && <div className="mt-4 flex justify-end">
          <button onClick={handleClearAllFilters} className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-600 underline-offset-2 transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline active:bg-gray-200">
            🗑 Clear All
          </button>
        </div>}
      </div>
    </div>
  );
};

export default VansFilter;
