import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const handleTypeFilter = (
  vanType: string,
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  params.append("type", vanType);
  router.push(`${currentPath}?${params.toString()}`);
};


export const handleMinFilter = (
  value: string,
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  value ? params.set("min", value) : params.delete("min");
  router.push(`${currentPath}?${params.toString()}`);
};

/**
 * Updates the URL with the maximum price filter.
 *
 * @param value - The maximum price entered by the user.
 * @param params - The current URL search parameters.
 * @param router - The Next.js App Router instance.
 * @param currentPath - The current route path.
 */
export const handleMaxFilter = (
  value: string,
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  value ? params.set("max", value) : params.delete("max");
  router.push(`${currentPath}?${params.toString()}`);
};

/**
 * Updates the URL with the selected city or country for location filtering.
 *
 * @param value - The city or country entered by the user.
 * @param params - The current URL search parameters.
 * @param router - The Next.js App Router instance.
 * @param currentPath - The current route path.
 */
export const handleLocationFilter = (
  value: string,
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  if (value) {
    params.set("city", value);
    params.set("country", value);
  } else {
    params.delete("city");
    params.delete("country");
  }
  router.push(`${currentPath}?${params.toString()}`);
};

/**
 * Updates the URL with the selected availability date.
 *
 * @param value - The selected date.
 * @param params - The current URL search parameters.
 * @param router - The Next.js App Router instance.
 * @param currentPath - The current route path.
 */
export const handleAvailabilityFilter = (
  value: string,
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  value ? params.set("date", value) : params.delete("date");
  router.push(`${currentPath}?${params.toString()}`);
};

/**
 * Clears the van type filter from the URL.
 *
 * @param params - The current URL search parameters.
 * @param router - The Next.js App Router instance.
 * @param currentPath - The current route path.
 */
export const handleClearTypeFilter = (
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  params.delete("type");
  router.push(`${currentPath}?${params.toString()}`);
};

/**
 * Clears all filters by resetting the search parameters.
 *
 * @param params - The current URL search parameters.
 * @param router - The Next.js App Router instance.
 * @param currentPath - The current route path.
 */
export const handleClearAllFilters = (
  params: URLSearchParams,
  router: AppRouterInstance,
  currentPath: string
): void => {
  params = new URLSearchParams(); // ✅ Reset search parameters
  router.push(`${currentPath}?${params.toString()}`);
};

/**
 * Checks if any filter is applied and updates the state accordingly.
 *
 * @param params - The current URL search parameters.
 * @param setHasAnyFilter - State setter function to track if filters are applied.
 */
export const toggleClearAllFilter = (
  params: URLSearchParams,
  setHasAnyFilter: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setHasAnyFilter([...params.keys()].length > 0);
};

/**
 * Checks if a type filter is applied and updates the state accordingly.
 *
 * @param value - The van type filter being checked.
 * @param params - The current URL search parameters.
 * @param setIsTypeFiltered - State setter function to track if a type filter is applied.
 */
export const toggleTypeClearFilter = (
  value: string,
  params: URLSearchParams,
  setIsTypeFiltered: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setIsTypeFiltered(params.has(value));
};



