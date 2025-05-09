"use client";

import React from "react";
import PaymentsTable from "./PaymentsTable";


const Payments: React.FC = () => {
  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">My Payments</h2>
      <PaymentsTable />
    </section>
  );
};

export default Payments;
