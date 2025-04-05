import {
  HomeIcon,
  TruckIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BellAlertIcon,
  UserIcon,
} from "@heroicons/react/24/outline";


/**
 * Navigation Links Configuration
 *
 * This array defines the reusable navigation links for the user dashboard.
 * Each link includes:
 * - `name`: The display name of the navigation item.
 * - `href`: The URL path for the navigation link.
 * - `icon`: The associated Heroicon component for visual representation.
 *
 * The icons are imported from Heroicons and styled with a width of `w-6`.
 *
 * @constant
 * @type {Array<{ name: string; href: string; icon: React.ReactElement }>}
 */


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
