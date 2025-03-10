import React from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { UpdateInvoice, DeleteInvoice } from "./Buttons";

const Table = () => {
  const userVans = [1, 2];
  const available = true;

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
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>Van name</p>
                    </div>
                    <p className="text-sm text-gray-500">Email</p>
                  </div>
                  {/* <InvoiceStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">currency</p>
                    <p>date</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    update invoice delete invoice
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Vans
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Availability
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
                          className="rounded-lg"
                          alt={`Van's thumbnail`}
                          layout="fill"
                        />
                      </div>

                      <p>Van Name</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 ">$200</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`flex justify-center items-center rounded-lg px-3 py-1 text-sm font-semibold ${
                        available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {available ? (
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
                    <UpdateInvoice id="id" />
                    <DeleteInvoice id="id" />
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

// TODO: Define the style of the table as it should look normally for each sections
//  TODO: Edit the database so that i can use the info to display
