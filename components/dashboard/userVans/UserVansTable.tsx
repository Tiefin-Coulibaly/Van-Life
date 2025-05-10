"use client";

import Image from "next/image";
import { VanWithReviews } from "@/types/user";

const UserVansTable = ({ vans }: { vans: VanWithReviews[] }) => {
  if (!vans || vans.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-600">No vans.</p>
      </div>
    );
  }

  const renderFeatures = (features: any) => {
    if (!features) return "No features specified";

    const featureList: any[] = [];
    if (features.hasKitchen) featureList.push("Kitchen");
    if (features.hasToilet) featureList.push("Toilet");
    if (features.hasAC) featureList.push("AC");
    if (features.hasHeating) featureList.push("Heating");
    if (features.petFriendly) featureList.push("Pet Friendly");

    return featureList.length > 0
      ? featureList.join(", ")
      : "No features specified";
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {vans.map((van) => (
              <div
                key={van.id}
                className="mb-4 w-full rounded-md bg-white p-4 shadow"
              >
                {/* Van Image and Basic Info */}
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="relative h-20 w-20">
                    {van.images?.[0] && (
                      <Image
                        src={van.images[0]}
                        className="rounded-lg object-cover"
                        alt={`${van.name || "Van"} thumbnail`}
                        fill
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {van.name || "Van"}
                    </p>
                    <p className="text-sm text-gray-600">${van.price}/day</p>
                    <p className="text-xs text-gray-500">{van.type}</p>
                  </div>
                </div>

                {/* Specifications */}
                <div className="border-b py-3">
                  <h3 className="mb-2 font-medium">Specifications</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="font-medium">Sleeps:</span>{" "}
                      {van.features?.sleepingCapacity || "Not specified"}
                    </p>
                    <p>
                      <span className="font-medium">Seats:</span>{" "}
                      {van.features?.seats || "Not specified"}
                    </p>
                    <p>
                      <span className="font-medium">Fuel:</span> {van.fuelType}
                    </p>
                    <p>
                      <span className="font-medium">Mileage:</span>{" "}
                      {van.mileage ? `${van.mileage} mi` : "Not specified"}
                    </p>
                    <p className="col-span-2">
                      <span className="font-medium">Features:</span>{" "}
                      {renderFeatures(van.features)}
                    </p>
                  </div>
                </div>

                {/* Location & Rating */}
                <div className="flex justify-between py-3">
                  <div>
                    <h3 className="mb-1 font-medium">Location</h3>
                    <p className="text-sm">
                      {van.city}, {van.country}
                    </p>
                  </div>
                </div>

                {/* Insurance */}
                <div className="pt-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Insurance:</span>{" "}
                    {van.insuranceIncluded ? "Included" : "Not included"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full table-fixed">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  {/* Adjusted column widths with percentages */}
                  <th
                    scope="col"
                    className="w-[30%] px-4 py-5 font-medium text-gray-900 sm:pl-6"
                  >
                    Van Details
                  </th>
                  <th
                    scope="col"
                    className="w-[25%] px-3 py-5 font-medium text-gray-900"
                  >
                    Specifications
                  </th>
                  <th
                    scope="col"
                    className="w-[20%] px-3 py-5 font-medium text-gray-900"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="w-[25%] px-3 py-5 font-medium text-gray-900"
                  >
                    Features & Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {vans.map((van) => (
                  <tr
                    key={van.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none"
                  >
                    {/* Van Image and Name - fixed width and proper wrapping */}
                    <td className="py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-20 w-20 flex-shrink-0">
                          {van.images?.[0] && (
                            <Image
                              src={van.images[0]}
                              className="rounded-lg object-cover"
                              alt={`${van.name || "Van"} thumbnail`}
                              fill
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">
                            {van.name || "Van"}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${van.price}/day
                          </p>
                          <p className="text-xs text-gray-500">{van.type}</p>
                        </div>
                      </div>
                    </td>

                    {/* Specifications - word break and proper wrapping */}
                    <td className="break-words px-3 py-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">
                          <span className="font-medium">Sleeps:</span>{" "}
                          {van.features?.sleepingCapacity || "Not specified"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Seats:</span>{" "}
                          {van.features?.seats || "Not specified"}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Fuel:</span>{" "}
                          {van.fuelType}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Mileage:</span>{" "}
                          {van.mileage ? `${van.mileage} mi` : "Not specified"}
                        </p>
                      </div>
                    </td>

                    {/* Location - word break */}
                    <td className="break-words px-3 py-3">
                      <div className="flex flex-col">
                        <p className="font-medium">{van.city}</p>
                        <p className="text-sm text-gray-500">{van.country}</p>
                      </div>
                    </td>

                    {/* Features & Rating - proper wrapping */}
                    <td className="break-words px-3 py-3">
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="mb-1 text-sm">
                            <span className="font-medium">Features:</span>
                          </p>
                          <p className="text-xs text-gray-600">
                            {renderFeatures(van.features)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm">
                          <span className="font-medium">Insurance:</span>{" "}
                          {van.insuranceIncluded ? "Included" : "Not included"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVansTable;
