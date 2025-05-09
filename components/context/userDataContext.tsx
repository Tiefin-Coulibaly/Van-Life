// components/context/userDataContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  use,
} from "react";
import { useSession } from "next-auth/react";
import { BookingWithVan } from "@/types/bookingTypes";
import { ReviewWithVan } from "@/types/review";
import {
  Booking,
  Payment,
  Review,
  Van,
  Notification as PrismaNotification,
} from "@prisma/client";
import {
  PaymentWithBooking,
  UserDataResponse,
  VanWithReviews,
} from "@/types/user";

// Define types for your context
interface UserDataContextType {
  bookings: BookingWithVan[];
  reviews: ReviewWithVan[];
  payments: PaymentWithBooking[];
  notifications: PrismaNotification[];
  vans: VanWithReviews[];
  user: UserDataResponse | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  authStatus: string;
}

const UserDataContext = createContext<UserDataContextType>({
  bookings: [],
  reviews: [],
  payments: [],
  notifications: [],
  vans: [],
  user: null,
  isLoading: true,
  error: null,
  markAllNotificationsAsRead: async () => {},
  markNotificationAsRead: async () => {},
  refreshData: async () => {},
  authStatus:"unauthenticated"
});

export const UserDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const [bookings, setBookings] = useState<BookingWithVan[]>([]);
  const [reviews, setReviews] = useState<ReviewWithVan[]>([]);
  const [payments, setPayments] = useState<PaymentWithBooking[]>([]);
  const [notifications, setNotifications] = useState<PrismaNotification[]>([]);
  const [vans, setVans] = useState<VanWithReviews[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dataLoaded = useRef(false);
  const lastUserId = useRef<string | null>(null);

  console.log("UserDataProvider:", userData);
  console.log("status:", status);

  const fetchUserData = async (force = false) => {
    if (!session?.user?.id) {
      setIsLoading(false);
      return;
    }

    if (
      !force &&
      dataLoaded.current &&
      lastUserId.current === session.user.id
    ) {
      console.log("Using cached user data for:", session.user.id);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user-data?userId=${session.user.id}`);
      if (!response.ok) throw new Error("Failed to fetch User data");
      const userData = await response.json();

      setBookings(userData.bookings || []);
      setReviews(userData.reviews || []);
      setPayments(userData.payments || []);
      setNotifications(userData.notifications || []);
      setVans(userData.vansRented || []);
      setUserData(userData);

      dataLoaded.current = true;
      lastUserId.current = session.user.id;
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      dataLoaded.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (!dataLoaded.current || lastUserId.current !== session?.user?.id) {
        fetchUserData();
      }
    } else if (status === "unauthenticated") {
      setBookings([]);
      setReviews([]);
      setPayments([]);
      setNotifications([]);
      setVans([]);
      setIsLoading(false);
      dataLoaded.current = false;
      lastUserId.current = null;
    }
  }, [status, session?.user?.id]);

  const refreshData = async () => {
    await fetchUserData(true);
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const response = await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Update local state to reflect changes
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, read: true })),
        );
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const response = await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification,
          ),
        );
      }
    } catch (error) {
      console.error(
        `Error marking notification ${notificationId} as read:`,
        error,
      );
    }
  };

  const value = {
    bookings,
    reviews,
    payments,
    notifications,
    vans,
    user: userData,
    isLoading,
    error,
    refreshData,
    markAllNotificationsAsRead,
    markNotificationAsRead,
    authStatus: status,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook for using the context
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
