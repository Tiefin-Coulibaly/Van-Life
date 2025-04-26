import Card from "@/components/dashboard/Card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  TruckIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  StarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { calculateBookingStats, calculateRatingStats, getTotalVans, userStats } from "@/app/lib/actions/dashboardActions";
import { Booking, Review, Van } from "@prisma/client";
import KeyMetrics from "@/components/dashboard/overview/KeyMetrics";

const OverviewSection = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  const userData = await userStats(session.user.id as string);
  const bookingStats = calculateBookingStats(userData?.bookings as Booking[])
  const totalVans = getTotalVans(userData?.vansRented as Van[]);
  const ratingStats = calculateRatingStats(userData?.reviews as Review[]);
  
  
  // This would come from your database in a real implementation
  const stats = {
    bookings: {
      total: 18,
      pending: 3,
      completed: 12,
      canceled: 3,
      trend: "+12%",
      isUp: true
    },
    revenue: {
      total: 3860,
      pending: 420,
      monthly: 1240,
      trend: "+8%",
      isUp: true
    },
    vans: {
      total: 5,
      available: 3,
      booked: 2,
      maintenance: 0
    },
    ratings: {
      average: 4.8,
      count: 36,
      recent: 4.9
    }
  };

  // Recent bookings - would be fetched from database
  const recentBookings = [
    {
      id: "b1",
      vanName: "Adventure Camper",
      vanImg: "/images/vans/van-1.jpg", // Adjust path as needed
      startDate: "Apr 20, 2025",
      endDate: "Apr 25, 2025",
      status: "Confirmed",
      amount: "$580",
      customer: "John Doe"
    },
    {
      id: "b2",
      vanName: "Wilderness Explorer",
      vanImg: "/images/vans/van-2.jpg",
      startDate: "Apr 28, 2025",
      endDate: "May 2, 2025",
      status: "Pending",
      amount: "$420",
      customer: "Sarah Smith"
    },
    {
      id: "b3",
      vanName: "Mountain Cruiser",
      vanImg: "/images/vans/van-3.jpg",
      startDate: "May 5, 2025",
      endDate: "May 10, 2025",
      status: "Confirmed",
      amount: "$650",
      customer: "Mike Johnson"
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session.user.name || `${session.user.firstName || ''} ${session.user.lastName || ''}`}
        </h1>
        <p className="mt-1 text-gray-600">Here's what's happening with your rentals today.</p>
      </div>

      {/* Key metrics */}
      
        <KeyMetrics 
          bookingStats={bookingStats} 
          vansTotal={totalVans} 
          ratingStats={ratingStats} 
        />
   
      

      {/* Recent bookings and upcoming section */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent bookings */}
        <div className="col-span-2 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Link href="/dashboard/bookings" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <li key={booking.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image 
                        src={booking.vanImg} 
                        alt={booking.vanName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 64px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{booking.vanName}</h3>
                        <span 
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{booking.customer}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          <ClockIcon className="mr-1 inline h-3 w-3" />
                          {booking.startDate} - {booking.endDate}
                        </p>
                        <p className="text-sm font-medium text-gray-900">{booking.amount}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Quick stats or calendar summary */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
          
          {/* Calendar or timeline style upcoming bookings */}
          <div className="space-y-4">
            <div className="rounded-md bg-blue-50 p-3">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 flex-col items-center justify-center rounded-md bg-blue-100 text-blue-700">
                  <span className="text-xs font-semibold">APR</span>
                  <span className="text-lg font-bold">28</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Wilderness Explorer</h4>
                  <p className="text-xs text-gray-600">3:00 PM - Pickup by Sarah Smith</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-blue-50 p-3">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 flex-col items-center justify-center rounded-md bg-blue-100 text-blue-700">
                  <span className="text-xs font-semibold">MAY</span>
                  <span className="text-lg font-bold">02</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Wilderness Explorer</h4>
                  <p className="text-xs text-gray-600">10:00 AM - Return by Sarah Smith</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md bg-blue-50 p-3">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 flex-col items-center justify-center rounded-md bg-blue-100 text-blue-700">
                  <span className="text-xs font-semibold">MAY</span>
                  <span className="text-lg font-bold">05</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Mountain Cruiser</h4>
                  <p className="text-xs text-gray-600">2:00 PM - Pickup by Mike Johnson</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/dashboard/calendar" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View Full Calendar
            </Link>
          </div>
        </div>
      </div>
      
      {/* Additional insight section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Popular vans or analytics */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Most Popular Vans</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                <Image 
                  src="/images/vans/van-1.jpg" 
                  alt="Adventure Camper"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 48px"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Adventure Camper</h3>
                  <div className="flex items-center text-amber-400">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-xs text-gray-600">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">8 bookings this month</p>
                  <p className="text-sm font-medium text-gray-900">$116/day</p>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-[80%] rounded-full bg-blue-600"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                <Image 
                  src="/images/vans/van-2.jpg" 
                  alt="Wilderness Explorer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 48px"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Wilderness Explorer</h3>
                  <div className="flex items-center text-amber-400">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-xs text-gray-600">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">6 bookings this month</p>
                  <p className="text-sm font-medium text-gray-900">$140/day</p>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-[65%] rounded-full bg-blue-600"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                <Image 
                  src="/images/vans/van-3.jpg" 
                  alt="Mountain Cruiser"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 48px"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Mountain Cruiser</h3>
                  <div className="flex items-center text-amber-400">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-xs text-gray-600">4.7</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">5 bookings this month</p>
                  <p className="text-sm font-medium text-gray-900">$130/day</p>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                  <div className="h-1.5 w-[50%] rounded-full bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent reviews or user activity */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-start">
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <Image 
                    src="/images/users/user-1.jpg" 
                    alt="User"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">John Doe</h3>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    "Amazing van, perfectly clean and well maintained. Will definitely rent again!"
                  </p>
                  <p className="mt-1 text-xs text-gray-500">For Adventure Camper • 3 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-start">
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <Image 
                    src="/images/users/user-2.jpg" 
                    alt="User"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Sarah Smith</h3>
                    <div className="flex items-center text-amber-400">
                      {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    "Great experience overall. The van was comfortable and easy to drive."
                  </p>
                  <p className="mt-1 text-xs text-gray-500">For Wilderness Explorer • 5 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex items-start">
                <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <Image 
                    src="/images/users/user-3.jpg" 
                    alt="User"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 32px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Mike Johnson</h3>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    "Exceeded expectations! The van had all the amenities we needed for our trip."
                  </p>
                  <p className="mt-1 text-xs text-gray-500">For Mountain Cruiser • 1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSection;