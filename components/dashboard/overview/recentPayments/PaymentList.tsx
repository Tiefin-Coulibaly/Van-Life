import { FC } from "react";
import PaymentCard from "./PaymentCard";
import { fetchRecentPayments } from "@/app/lib/actions/dashboardActions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const PaymentList: FC = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return redirect("/auth/signin");
  }
  const recentPayments= await fetchRecentPayments(3, session.user.id as string);
  console.log(recentPayments);

  return (
    <div className="rounded-sm  bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark  xl:pb-1">
      <div className="flex flex-col gap-4">
        {recentPayments.length > 0 ? (
          recentPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        ) : (
          <div className="py-4 text-center text-gray-500 dark:text-gray-400">
            No recent payments.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentList