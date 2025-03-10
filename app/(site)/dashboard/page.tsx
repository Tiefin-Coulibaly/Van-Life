import Card from "@/components/dashboard/Card";
import { TruckIcon, CurrencyDollarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const OverviewSection = () => {
    const overviewData = [
        {title:"Total Vans", value:"5", icon:<TruckIcon className="size-4.5"/>},
        {title:"Total Trips", value:"12", icon:<GlobeAltIcon className="size-4.5"/>},
        {title:"Pending Payments", value:"$320", icon:<CurrencyDollarIcon className="size-4.5"/>},
        {title:"Earnings", value:"$2,500", icon:<CurrencyDollarIcon className="size-4.5"/>},
    ]
    return (
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {overviewData.map(data => (
            <Card key={data.title} title={data.title} value={data.value} icon={data.icon}/>
          ))}
        </div>
      </section>
    );
  };
  
  export default OverviewSection;
  