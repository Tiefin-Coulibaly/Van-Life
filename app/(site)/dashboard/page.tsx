import Card from "@/components/dashboard/Card";
import {
  TruckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const OverviewSection = async () => {
  
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  const overviewData = [
    {
      title: "Total Vans",
      value: "5",
      icon: <TruckIcon className="size-4.5" />,
    },
    {
      title: "Total Trips",
      value: "12",
      icon: <GlobeAltIcon className="size-4.5" />,
    },
    {
      title: "Pending Payments",
      value: "$320",
      icon: <CurrencyDollarIcon className="size-4.5" />,
    },
    {
      title: "Earnings",
      value: "$2,500",
      icon: <CurrencyDollarIcon className="size-4.5" />,
    },
  ];
  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">
        Hi, {session.user.name || `${session.user.firstName} ${session.user.lastName}`}
      </h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        
        {overviewData.map((data) => (
          <Card
            key={data.title}
            title={data.title}
            value={data.value}
            icon={data.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default OverviewSection;
