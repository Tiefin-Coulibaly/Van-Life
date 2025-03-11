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

const BookingsTable = () => {
  const userVans = [1, 2];
  const status = "canceled";

 
  const handleStatus = (status: "confirmed" | "canceled" | "pending") => {
    if (status === "confirmed") {
      return (
        <>
          <FaCheckCircle className="mr-1 text-green-600" /> Confirmed
        </>
      );
    } else if (status === "canceled") {
      return (
        <>
          <FaExclamationTriangle className="mr-1 text-red-600" /> Canceled
        </>
      );
    } else if (status === "pending") {
      return (
        <>
          <ClockIcon className="mr-1 h-5  w-5 text-gray-700" /> Pending
        </>
      );
    }
  };

  const bookingStatusStyle = clsx({
    "bg-green-100 text-green-700": (status as string) === "confirmed",
    "bg-red-100 text-red-700": (status as string) === "canceled",
    "bg-gray-100 text-gray-700": (status as string) === "pending",
  });

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {userVans?.map((van) => (
              <div key={van} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="relative size-20">
                        <Image
                          src="/van1_thumbnail.jpg"
                          className="rounded-lg "
                          alt={`Van's thumbnail`}
                          layout="fill"
                        />
                      </div>
                      <p className="ml-2">Van name</p>
                    </div>
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${
                        bookingStatusStyle
                      }`}
                    >
                      {handleStatus("canceled")}
                    </span>
                  </div>
                  {/* <InvoiceStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex gap-1 ">
                    <p>Feb 28, 2025</p>
                    <span>|</span>
                    <p>Feb 28, 2025</p>
                  </div>
                  {/* <div className="flex justify-end gap-2">
                    update invoice delete invoice
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Van
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Start Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  End Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {userVans?.map((van) => (
                <tr
                  key={van}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-30">
                        <Image
                          src="/van1_thumbnail.jpg"
                          className="rounded-lg "
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
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${
                        bookingStatusStyle
                      }`}
                    >
                      {handleStatus("canceled")}
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
