import { Children } from "react";
import Link from "next/link";
import Heading2 from "@/components/headings/Heading2";


const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-30">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold text-gray-900">User Dashboard</h2>
        <nav className="mt-6 space-y-4">
          <Link href="#" className="block py-2 px-3 bg-gray-200 rounded">Overview</Link>
          <Link href="#" className="block py-2 px-3 hover:bg-gray-200 rounded">My Vans</Link>
          <Link href="#" className="block py-2 px-3 hover:bg-gray-200 rounded">Bookings</Link>
          <Link href="#" className="block py-2 px-3 hover:bg-gray-200 rounded">Payments</Link>
          <Link href="#" className="block py-2 px-3 hover:bg-gray-200 rounded">Notifications</Link>
          <Link href="#" className="block py-2 px-3 hover:bg-gray-200 rounded">Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
