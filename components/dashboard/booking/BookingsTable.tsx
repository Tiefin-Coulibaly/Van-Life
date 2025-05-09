"use client";

import Image from "next/image";
import {
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {  useEffect } from "react";
import { BookingStatus } from "@prisma/client";
import { formatDate } from "@/app/lib/actions/dashboardActions";
import { useUserData } from "@/components/context/userDataContext";


const BookingsTable = () => {
  const { bookings, isLoading } = useUserData();



  useEffect(() => {
    if (bookings?.length > 0) {
      console.log(
        "First booking van image URL:",
        bookings[0]?.van?.images?.[0],
      );
    }
  }, [bookings]);

  const handleStatus = (status: BookingStatus) => {
    switch (status) {
      case "Confirmed":
        return (
          <>
            <FaCheckCircle className="mr-1 text-green-600" /> Confirmed
          </>
        );
      case "Canceled":
        return (
          <>
            <FaExclamationTriangle className="mr-1 text-red-600" /> Canceled
          </>
        );
      case "Pending":
        return (
          <>
            <ClockIcon className="mr-1 h-5 w-5 text-gray-700" /> Pending
          </>
        );
      default:
        return <></>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-600">No bookings.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile Layout */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            {bookings?.map((booking) => (
              <div
                key={booking.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="border-b pb-4">
                  <div className="flex w-full items-center justify-between ">
                    {/* Left side: Van image and name */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative h-20 w-20">
                        {booking.van?.images?.[0] ? (
                          <Image
                            src={booking.van.images[0]}
                            alt={`${booking.van.name || "Van"} thumbnail`}
                            fill
                            sizes="(max-width: 768px) 80px, 40px"
                            className="rounded-lg object-cover"
                            priority
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                            <span className="text-xs text-gray-500">
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm">{booking.van?.name || "Van"}</p>
                    </div>

                    {/* Right side: Status badge */}
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${clsx(
                        {
                          "bg-green-100 text-green-700":
                            booking.status === "Confirmed",
                          "bg-red-100 text-red-700":
                            booking.status === "Canceled",
                          "bg-gray-100 text-gray-700":
                            booking.status === "Pending",
                        },
                      )}`}
                    >
                      {handleStatus(booking.status)}
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex gap-1">
                    <p>{formatDate(booking.startDate)}</p>
                    <span>|</span>
                    <p>{formatDate(booking.endDate)}</p>
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
              {bookings?.map((booking) => (
                <tr
                  key={booking.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-30 w-30">
                        {booking.van?.images?.[0] && (
                          <Image
                            src={booking.van.images[0]}
                            className="rounded-lg object-cover"
                            alt={`${booking.van.name || "Van"}'s thumbnail`}
                            fill
                            priority
                          />
                        )}
                      </div>
                      <p>{booking.van.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDate(booking.startDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDate(booking.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${clsx(
                        {
                          "bg-green-100 text-green-700":
                            booking.status === "Confirmed",
                          "bg-red-100 text-red-700":
                            booking.status === "Canceled",
                          "bg-gray-100 text-gray-700":
                            booking.status === "Pending",
                        },
                      )}`}
                    >
                      {handleStatus(booking.status)}
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
