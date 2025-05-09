"use client";

import DesktopLayout from "@/components/dashboard/DesktopLayout";
import MobileAndTabletLayout from "@/components/dashboard/MobileAndTabletLayout";
import { SessionProvider, useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>
      <div className="mt-18 flex min-h-screen flex-col md:mt-22 lg:mt-30 lg:flex-row lg:bg-gray-100">
        <MobileAndTabletLayout />

        {/* Desktop Sidebar */}
        <DesktopLayout />

        {/* Main Content */}
        <main className="mt-2 flex-1 md:mt-4 lg:mt-2 lg:p-6 ">
          <ToastContainer />
          {children}
        </main>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
