"use client";

import { useState } from "react";
import { FiMenu, FiX, FiSidebar } from "react-icons/fi";
import { MdDashboard } from "react-icons/md"; // Use dashboard icon
import DesktopLayout from "@/components/dashboard/DesktopLayout";
import MobileAndTabletLayout from "@/components/dashboard/MobileAndTabletLayout";

import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="mt-18 flex flex-col lg:flex-row min-h-screen lg:bg-gray-100 md:mt-22 lg:mt-30">
      <MobileAndTabletLayout/>

      {/* Desktop Sidebar */}
      <DesktopLayout/>

      {/* Main Content */}
      <main className="mt-2 md:mt-4 lg:mt-2 flex-1 lg:p-6 ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
