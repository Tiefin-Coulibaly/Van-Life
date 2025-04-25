import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PaymentCancelPage() {
  const session = await auth();
  const userId = session?.user?.id || null;
  if (!session || !userId) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <FaTimesCircle className="mx-auto text-5xl text-red-500" />
          <h1 className="mt-4 text-2xl font-bold">Payment Cancelled</h1>
          <p className="mt-2 text-gray-600">
            Your van booking has been cancelled. No charges have been made.
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition hover:bg-gray-50"
          >
            Return Home
          </Link>
          <Link
            href="/vans"
            className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800"
          >
            Browse Vans
          </Link>
        </div>
      </div>
    </div>
  );
}
