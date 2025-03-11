"use client"

import { useState } from "react";
import { FiMenu, FiX, FiSidebar,  } from "react-icons/fi";
import { MdDashboard } from "react-icons/md"; // Use dashboard icon

import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 mt-15">
      {/* Mobile App Navbar */}
      <header className="md:hidden fixed top-15 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-50">
        <h2 className="text-lg font-bold text-gray-900">User Dashboard</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl text-gray-700"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FiSidebar /> : <MdDashboard />}
        </button>
      </header>

      {/* Sidebar (For Dashboard Navigation) */}
      <aside
        className={`fixed z-99999 inset-y-0 top-35 left-0 w-64 bg-white shadow-md p-6 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-gray-700"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close Sidebar"
        >
          <FiX />
        </button>

        <h2 className="text-xl font-bold text-gray-900 hidden md:block">User Dashboard</h2>
        <nav className="mt-6 space-y-4">
          <Link href="/dashboard" className="block py-2 px-3 bg-gray-200 rounded">
            Overview
          </Link>
          <Link href="/dashboard/myvans" className="block py-2 px-3 hover:bg-gray-200 rounded">
            My Vans
          </Link>
          <Link href="/dashboard/bookings" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Bookings
          </Link>
          <Link href="/dashboard/payments" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Payments
          </Link>
          <Link href="/dashboard/notifications" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Notifications
          </Link>
          <Link href="/dashboard/profile" className="block py-2 px-3 hover:bg-gray-200 rounded">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 mt-14 md:mt-0">{children}</main>
    </div>
  );
};

export default DashboardLayout;
