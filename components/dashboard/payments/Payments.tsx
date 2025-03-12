"use client";

import React from "react";
import PaymentsTable from "./PaymentsTable";

/**
 * Payments Component
 *
 * This component serves as the main section for displaying payment-related information.
 * - **Renders the `PaymentsTable` component** to show a list of transactions.
 * - **Encapsulates the payment details in a styled container**.
 *
 * @component
 * @returns {React.ReactElement} A structured section containing payment details.
 */
const Payments: React.FC = () => {
  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Payments</h2>
      <PaymentsTable />
    </section>
  );
};

export default Payments;
