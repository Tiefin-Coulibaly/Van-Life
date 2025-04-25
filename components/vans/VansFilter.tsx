"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  handleTypeFilter,
  handleMinFilter,
  handleMaxFilter,
  handleLocationFilter,
  handleAvailabilityFilter,
  handleClearTypeFilter,
  handleClearAllFilters,
  toggleClearAllFilter,
  toggleTypeClearFilter,
} from "@/app/lib/utils/vansFiltering";


const VansFilter: React.FC = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTypeFiltered, setIsTypeFiltered] = useState<boolean>(false);
  const [hasAnyFilter, setHasAnyFilter] = useState<boolean>(false);


  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPath = usePathname();
  const router = useRouter();


  const debouncedHandleMinFilter = useDebouncedCallback(
    (value: string) => handleMinFilter(value, params, router, currentPath),
    250,
  );


  const debouncedHandleMaxFilter = useDebouncedCallback(
    (value: string) => handleMaxFilter(value, params, router, currentPath),
    250,
  );


  const debouncedHandleLocationFilter = useDebouncedCallback(
    (value: string) => handleLocationFilter(value, params, router, currentPath),
    250,
  );


  useEffect(() => {
    toggleClearAllFilter(params, setHasAnyFilter);
  }, [[...params.keys()].length || 0]);

  useEffect(() => {
    toggleTypeClearFilter("type", params, setIsTypeFiltered);
  }, [params.get("type")]);

  return (
    <div className="mb-6 mt-14 rounded-lg bg-white p-4 shadow-md">
      {/* Toggle Button for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full rounded-md bg-gray-200 py-2 text-center font-semibold md:hidden"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Container */}
      <div
        className={`${isOpen ? "block" : "hidden"} mt-4 md:mt-0 md:flex md:flex-wrap md:items-center md:justify-around md:gap-y-10 md:space-x-2 lg:flex-nowrap`}
      >
        {/* Van Type Filter */}
        <div className="mb-4 flex flex-wrap items-end gap-2 md:mb-0">
          {["Simple", "Rugged", "Luxury"].map((type) => (
            <button
              key={type}
              onClick={() =>
                handleTypeFilter(
                  type,
                  params,
                  router,
                  currentPath,
                )
              }
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 active:bg-gray-200 md:px-2 lg:px-4"
            >
              {type}
            </button>
          ))}
          {/* Clear Type Filter Button */}
          {isTypeFiltered && (
            <p
              className="ml-2 cursor-pointer text-sm text-red-500 underline underline-offset-2 transition-all hover:text-red-700"
              onClick={() => handleClearTypeFilter(params, router, currentPath)}
            >
              ✖ Clear type filter
            </p>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="mb-4 flex items-center space-x-2 md:mb-0">
          <input
            onChange={(e) => debouncedHandleMinFilter(e.target.value)}
            type="number"
            placeholder="Min $"
            defaultValue={params.get("min")?.toString()}
            className="w-22 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
          <span>-</span>
          <input
            onChange={(e) => debouncedHandleMaxFilter(e.target.value)}
            type="number"
            placeholder="Max $"
            defaultValue={params.get("max")?.toString()}
            className="w-22 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Location Filter */}
        <div className="relative mb-4 flex items-center md:mb-0">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            onChange={(e) => debouncedHandleLocationFilter(e.target.value)}
            type="text"
            placeholder="Search city or country"
            defaultValue={params.get("city")?.toString()}
            className="w-56 rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:outline-none"
          />
        </div>

        {/* Date Picker Filter */}
        <div className="relative">
          <label
            htmlFor="availability-date"
            className="text-sm font-medium md:absolute md:-top-5 lg:-top-7"
          >
            Check Vans Availability:
          </label>
          <input
            id="availability-date"
            onChange={(e) =>
              handleAvailabilityFilter(
                e.target.value,
                params,
                router,
                currentPath,
              )
            }
            type="date"
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
          />
        </div>

        {/* Clear All Filters */}
        {hasAnyFilter && (
          <div className="mt-4 flex md:justify-end">
            <button
              onClick={() => handleClearAllFilters(params, router, currentPath)}
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-600 underline-offset-2 transition-all hover:bg-gray-100 hover:text-gray-900 hover:underline active:bg-gray-200"
            >
              🗑 Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VansFilter;
