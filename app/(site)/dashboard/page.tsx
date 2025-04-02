import Card from "@/components/dashboard/Card";
import {
  TruckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const OverviewSection = async () => {
  
  // get the session
  const session = await auth();

  // protect the route by redirecting the user to the 
  // log in page
  if (!session || !session.user) {
    redirect("/auth/signin")
  }

  
  console.log(`Session Data:`);
  console.dir(session, {depth:null});

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
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <h1>
          Hi, {session?.user?.firstName} {session?.user?.lastName}
        </h1>
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
