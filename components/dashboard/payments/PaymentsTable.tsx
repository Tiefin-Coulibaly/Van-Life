
"use client";

import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Payment } from "@prisma/client";
import { useUserData } from "@/components/context/userDataContext";
import { formatDate } from "@/app/lib/actions/dashboardActions";
import { PaymentWithBooking } from "@/types/user";

const PaymentsTable = ({payments}:{payments:PaymentWithBooking[]}) => {


  const getPaymentStatus = (
    payment: Payment,
  ): "confirmed" | "canceled" | "pending" => {
    if (payment.stripePaymentId) {
      return "confirmed";
    }
    return "pending";
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderStatus = (status: string): React.ReactNode => {
    if (status === "confirmed") {
      return (
        <>
          <FaCheckCircle className="mr-1 text-green-600" /> Confirmed
        </>
      );
    }
    if (status === "canceled") {
      return (
        <>
          <FaExclamationTriangle className="mr-1 text-red-600" /> Canceled
        </>
      );
    }
    return (
      <>
        <ClockIcon className="mr-1 h-5 w-5 text-gray-700" /> Pending
      </>
    );
  };



  if (!payments || payments.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-gray-600">No payment history.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {payments.map((payment) => {
              const status = getPaymentStatus(payment);

              return (
                <div
                  key={payment.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  {/* First section with amount */}
                  <div className="flex items-center justify-center border-b pb-4">
                    <div className="text-center">
                      <p className="text-xl font-medium">
                        {formatAmount(
                          Number(payment.booking?.totalAmount ?? 0),
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        Paid via {payment.method}
                      </p>
                    </div>
                  </div>

                  {/* Second section with date, status and receipt */}
                  <div className="flex flex-col items-center justify-center pt-4">
                    <p className="mb-2">{formatDate(payment.createdAt)}</p>
                    <span
                      className={clsx(
                        "flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold",
                        {
                          "bg-green-100 text-green-700": status === "confirmed",
                          "bg-red-100 text-red-700": status === "canceled",
                          "bg-gray-100 text-gray-700": status === "pending",
                        },
                      )}
                    >
                      {renderStatus(status)}
                    </span>
                    {payment.receiptUrl && (
                      <a
                        href={payment.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-sm text-blue-600 hover:underline"
                      >
                        View Receipt
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium text-gray-900 sm:pl-6">
                  Amount
                </th>
                <th className="px-3 py-5 font-medium text-gray-900">Method</th>
                <th className="px-3 py-5 font-medium text-gray-900">Date</th>
                <th className="px-3 py-5 font-medium text-gray-900">Status</th>
                <th className="px-3 py-5 font-medium text-gray-900">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments.map((payment) => {
                const status = getPaymentStatus(payment);

                return (
                  <tr
                    key={payment.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none 
                    [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                    [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {/* Using booking's total amount as payment amount */}
                      {formatAmount(Number(payment.booking?.totalAmount ?? 0))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {payment.method}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <span
                        className={clsx(
                          "flex w-fit items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold",
                          {
                            "bg-green-100 text-green-700":
                              status === "confirmed",
                            "bg-red-100 text-red-700": status === "canceled",
                            "bg-gray-100 text-gray-700": status === "pending",
                          },
                        )}
                      >
                        {renderStatus(status)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {payment.receiptUrl ? (
                        <a
                          href={payment.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Receipt
                        </a>
                      ) : (
                        <span className="text-gray-400">Not available</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
