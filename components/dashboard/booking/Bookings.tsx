"use client";

import React from "react";
import BookingsTable from "./BookingsTable";


const Bookings = (): React.ReactElement => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">My Bookings</h2>
      <BookingsTable />
    </section>
  );
};

export default Bookings;
