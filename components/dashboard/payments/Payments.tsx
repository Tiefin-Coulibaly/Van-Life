"use client";

import React from "react";
import PaymentsTable from "./PaymentsTable";
import { PaymentWithBooking } from "@/types/user";


const Payments = ({payments}:{payments:PaymentWithBooking[]}) => {
  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">My Payments</h2>
      <PaymentsTable payments={payments}/>
    </section>
  );
};

export default Payments;
