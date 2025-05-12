"use client";

import DesktopLayout from "@/components/dashboard/DesktopLayout";
import MobileAndTabletLayout from "@/components/dashboard/MobileAndTabletLayout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import { useRouter } from "next/navigation";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router])
  return (
    <SessionProvider>
      <div className="mb-20 mt-18 mt-32 flex min-h-screen flex-col md:mt-35 lg:mt-40 lg:flex-row lg:bg-gray-100 xl:mt-45">
        <MobileAndTabletLayout />

        {/* Desktop Sidebar */}
        <DesktopLayout />

        {/* Main Content */}
        <main className="mt-2 flex-1 md:mt-4 lg:mt-2 lg:p-6 ">
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="z-99999"
          />
          {children}
        </main>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
