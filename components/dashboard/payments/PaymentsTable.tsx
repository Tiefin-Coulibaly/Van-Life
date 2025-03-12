"use client";

import React from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

/**
 * Payment Status Type
 *
 * Defines the possible states for a payment transaction.
 */
type PaymentStatus = "confirmed" | "canceled" | "pending";

/**
 * Payment Data Type
 *
 * Represents a single payment transaction.
 */
interface Payment {
  id: number;
  amount: string;
  method: string;
  date: string;
  status: PaymentStatus;
}

/**
 * PaymentsTable Component
 *
 * This component renders a table displaying payment transactions.
 * It provides:
 * - **A responsive design** that adapts to mobile and desktop views.
 * - **Status indicators** with dynamic styling based on payment status.
 * - **Proper accessibility and structured data presentation**.
 *
 * @returns {React.ReactElement} A structured table for displaying payment details.
 */
const PaymentsTable: React.FC = () => {
  // Sample payment data (Mocked for demonstration purposes)
  const payments: Payment[] = [
    {
      id: 1,
      amount: "$200",
      method: "Credit Card",
      date: "Feb 28, 2025",
      status: "confirmed",
    },
    {
      id: 2,
      amount: "$150",
      method: "PayPal",
      date: "Mar 05, 2025",
      status: "pending",
    },
  ];

  /**
   * Renders the status indicator based on the payment status.
   *
   * @param {PaymentStatus} status - The current payment status.
   * @returns {React.ReactNode} A JSX element representing the status badge.
   */
  const renderStatus = (status: PaymentStatus): React.ReactNode => {
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

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-xl font-medium">{payment.amount}</p>
                    <p className="text-sm text-gray-500">
                      Paid via {payment.method}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="mb-2">{payment.date}</p>
                    <span
                      className={clsx(
                        "flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold",
                        {
                          "bg-green-100 text-green-700":
                            payment.status === "confirmed",
                          "bg-red-100 text-red-700":
                            payment.status === "canceled",
                          "bg-gray-100 text-gray-700":
                            payment.status === "pending",
                        },
                      )}
                    >
                      {renderStatus(payment.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {payment.amount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {payment.method}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {payment.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={clsx(
                        "flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold",
                        {
                          "bg-green-100 text-green-700":
                            payment.status === "confirmed",
                          "bg-red-100 text-red-700":
                            payment.status === "canceled",
                          "bg-gray-100 text-gray-700":
                            payment.status === "pending",
                        },
                      )}
                    >
                      {renderStatus(payment.status)}
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

export default PaymentsTable;
