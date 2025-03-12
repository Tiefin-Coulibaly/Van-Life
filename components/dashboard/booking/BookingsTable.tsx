"use client";

import React from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

/**
 * **BookingsTable Component**
 *
 * Displays a table of user van bookings, including:
 * - Van details with an image
 * - Booking start and end dates
 * - Status indicators (confirmed, canceled, pending)
 *
 * Features:
 * - **Responsive Design** (Mobile-first with a hidden table on small screens)
 * - **Dynamic Status Display** with icons for visual clarity
 * - **Tailwind Styling** for a clean and modern look
 *
 * @returns {React.ReactElement} A responsive table displaying user bookings.
 */
const BookingsTable = (): React.ReactElement => {
  // Mock data for booked vans
  const userVans = [1, 2];

  // Example status (can be replaced with real data from an API)
  const status: "confirmed" | "canceled" | "pending" = "canceled";

  /**
   * **Returns a JSX element representing the booking status.**
   *
   * @param { "confirmed" | "canceled" | "pending" } status - The status of the booking.
   * @returns {React.ReactElement} A badge with an icon indicating the status.
   */
  const handleStatus = (
    status: "confirmed" | "canceled" | "pending",
  ): React.ReactElement => {
    switch (status) {
      case "confirmed":
        return (
          <>
            <FaCheckCircle className="mr-1 text-green-600" /> Confirmed
          </>
        );
      case "canceled":
        return (
          <>
            <FaExclamationTriangle className="mr-1 text-red-600" /> Canceled
          </>
        );
      case "pending":
        return (
          <>
            <ClockIcon className="mr-1 h-5 w-5 text-gray-700" /> Pending
          </>
        );
      default:
        return <></>;
    }
  };

  // Dynamic styling for the status badge using clsx
  const bookingStatusStyle = clsx({
    "bg-green-100 text-green-700": (status as string) === "confirmed",
    "bg-red-100 text-red-700": (status as string) === "canceled",
    "bg-gray-100 text-gray-700": (status as string) === "pending",
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {userVans?.map((van) => (
              <div key={van} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="relative size-20">
                        <Image
                          src="/van1_thumbnail.jpg"
                          className="rounded-lg"
                          alt={`Van's thumbnail`}
                          layout="fill"
                        />
                      </div>
                      <p className="ml-2">Van name</p>
                    </div>
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${bookingStatusStyle}`}
                    >
                      {handleStatus(status)}
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex gap-1">
                    <p>Feb 28, 2025</p>
                    <span>|</span>
                    <p>Feb 28, 2025</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <table className="hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium text-gray-900 sm:pl-6"
                >
                  Van
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-gray-900">
                  Start Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-gray-900">
                  End Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {userVans?.map((van) => (
                <tr
                  key={van}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-30">
                        <Image
                          src="/van1_thumbnail.jpg"
                          className="rounded-lg"
                          alt={`Van's thumbnail`}
                          layout="fill"
                        />
                      </div>
                      <p>Van Name</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">Feb 28, 2025</td>
                  <td className="whitespace-nowrap px-3 py-3">Feb 28, 2025</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${bookingStatusStyle}`}
                    >
                      {handleStatus(status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
