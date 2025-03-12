"use client";

import React from "react";
import Image from "next/image";
import {
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { UpdateInvoice, DeleteInvoice } from "./Buttons";

/**
 * Represents a van item with essential details.
 */
interface Van {
  id: number;
  name: string;
  price: number;
  available: boolean;
  image: string;
}

/**
 * Table Component
 *
 * Displays a list of user vans in both **mobile and desktop layouts**.
 * - **Mobile:** Cards with van details.
 * - **Desktop:** Tabular format.
 *
 * Features:
 * - **Availability status indicators** (Available / Not Available).
 * - **Invoice update and delete actions**.
 * - **Responsive design for different screen sizes**.
 *
 * @returns {React.ReactElement} A responsive table displaying van details.
 */
const Table: React.FC = (): React.ReactElement => {
  // Mocked van data (Replace with real data from an API or state management)
  const userVans: Van[] = [
    {
      id: 1,
      name: "Nomadic Spirit",
      price: 200,
      available: true,
      image: "/van1_thumbnail.jpg",
    },
    {
      id: 2,
      name: "Adventure Explorer",
      price: 250,
      available: false,
      image: "/van1_thumbnail.jpg",
    },
  ];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile Layout */}
          <div className="md:hidden">
            {userVans.map((van) => (
              <div key={van.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="relative h-20 w-20">
                        <Image
                          src={van.image}
                          className="rounded-lg"
                          alt={`${van.name} thumbnail`}
                          layout="fill"
                        />
                      </div>
                      <p className="ml-2">{van.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">${van.price}</p>
                  </div>
                </div>

                {/* Availability & Actions */}
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${
                        van.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {van.available ? (
                        <>
                          <FaCheckCircle className="mr-1 text-green-600" />{" "}
                          Available
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="mr-1 text-red-600" />{" "}
                          Not Available
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={van.id.toString()} />
                    <DeleteInvoice id={van.id.toString()} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <table className="hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium text-gray-900 sm:pl-6">
                  Vans
                </th>
                <th scope="col" className="px-3 py-5 text-gray-900 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 text-gray-900 font-medium">
                  Availability
                </th>
                <th scope="col" className="px-3 py-5 text-gray-900 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {userVans.map((van) => (
                <tr
                  key={van.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-20 w-20">
                        <Image
                          src={van.image}
                          className="rounded-lg"
                          alt={`${van.name} thumbnail`}
                          layout="fill"
                        />
                      </div>
                      <p>{van.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">${van.price}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold ${
                        van.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {van.available ? (
                        <>
                          <FaCheckCircle className="mr-1 text-green-600" />{" "}
                          Available
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="mr-1 text-red-600" />{" "}
                          Not Available
                        </>
                      )}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={van.id.toString()} />
                      <DeleteInvoice id={van.id.toString()} />
                    </div>
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

export default Table;
