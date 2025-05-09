import {
  HomeIcon,
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BellAlertIcon,
  UserIcon,
} from "@heroicons/react/24/outline";



export const links: { name: string; href: string; icon: React.ReactElement }[] =
  [
    {
      name: "Home",
      href: "/dashboard",
      icon: <HomeIcon className="w-6" />,
    },
    {
      name: "Vans",
      href: "/dashboard/vans",
      icon: <TruckIcon className="w-6" />,
    },
    {
      name: "Bookings",
      href: "/dashboard/bookings",
      icon: <CalendarIcon className="w-6" />,
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: <CurrencyDollarIcon className="w-6" />,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: <BellAlertIcon className="w-6" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <UserIcon className="w-6" />,
    },
  ];
