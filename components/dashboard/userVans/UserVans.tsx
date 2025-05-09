"use client";

import React from "react";
import Table from "./UserVansTable";

const UserVans: React.FC = (): React.ReactElement => {
  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      {/* Section Title */}
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Vans</h2>

      {/* Table Component Rendering */}
      <Table />
    </section>
  );
};

export default UserVans;
