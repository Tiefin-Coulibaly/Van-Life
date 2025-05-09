import { prisma } from "@/prisma/prisma";
import { BookingStats } from "@/types/bookingTypes";
import { Booking, Review, Van } from "@prisma/client";
import { BookingWithVan } from "@/types/bookingTypes";
import { ReviewWithVan } from "@/types/review";
import { revalidatePath } from "next/cache";
import { FetchUserDataResult } from "@/types/user";

export const userStats = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      bookings: true,
      payments: true,
      notifications: true,
      reviews: true,
      vansRented: true,
    },
  });

  return user;
};

const determineComparisonPeriod = (bookings: Booking[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthStart = new Date(currentYear, currentMonth, 1);
  const previousMonthStart = new Date(currentYear, currentMonth - 1, 1);

  const currentMonthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    return bookingDate >= currentMonthStart;
  });

  const previousMonthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    return bookingDate >= previousMonthStart && bookingDate < currentMonthStart;
  });

  return {
    currentMonthBookings,
    previousMonthBookings,
    currentMonthStart,
    previousMonthStart,
  };
};

const calculateTrend = (
  current: number,
  previous: number,
): { trend: string; isUp: boolean } => {
  if (previous === 0) {
    return current > 0
      ? { trend: "+100%", isUp: true }
      : { trend: "0%", isUp: false };
  }
  const percentChange = ((current - previous) / previous) * 100;
  return {
    trend: `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(0)}%`,
    isUp: percentChange > 0,
  };
};

const calculateBookingCountPerStatus = (bookings: Booking[]) => {
  const bookingStatusCount = {
    pending: 0,
    completed: 0,
    canceled: 0,
  };

  bookings.forEach((booking) => {
    if (booking.status === "Pending") {
      bookingStatusCount.pending++;
    } else if (booking.status === "Confirmed") {
      bookingStatusCount.completed++;
    } else if (booking.status === "Canceled") {
      bookingStatusCount.canceled++;
    }
  });

  return bookingStatusCount;
};

const calculateMonthsExpenses = (
  bookings: Booking[],
  currentMonthStart: Date,
  previousMonthStart: Date,
) => {
  const currentMonthExpenses = bookings.reduce((acc, booking) => {
    const bookingDate = new Date(booking.startDate);
    if (bookingDate >= currentMonthStart) {
      return acc + Number(booking.totalAmount);
    }

    return acc;
  }, 0);

  const previousMonthExpenses = bookings.reduce((acc, booking) => {
    const bookingDate = new Date(booking.startDate);
    if (bookingDate >= previousMonthStart && bookingDate < currentMonthStart) {
      return acc + Number(booking.totalAmount);
    }
    return acc;
  }, 0);

  return { currentMonthExpenses, previousMonthExpenses };
};

const calculateRevenuePerStatus = (bookings: Booking[]) => {
  const revenueStatusCount = {
    pending: 0,
    completed: 0,
    canceled: 0,
  };

  bookings.forEach((booking) => {
    if (booking.status === "Pending") {
      revenueStatusCount.pending += Number(booking.totalAmount);
    } else if (booking.status === "Confirmed") {
      revenueStatusCount.completed += Number(booking.totalAmount);
    } else if (booking.status === "Canceled") {
      revenueStatusCount.canceled += Number(booking.totalAmount);
    }
  });
  return revenueStatusCount;
};

export const calculateBookingStats = (bookings: Booking[]) => {
  const {
    currentMonthBookings,
    previousMonthBookings,
    currentMonthStart,
    previousMonthStart,
  } = determineComparisonPeriod(bookings);

  const totalBookings = bookings.length;

  const totalAmount = bookings.reduce(
    (acc, booking) => acc + Number(booking.totalAmount),
    0,
  );
  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateA - dateB;
  });

  const { currentMonthExpenses, previousMonthExpenses } =
    calculateMonthsExpenses(bookings, currentMonthStart, previousMonthStart);

  const { trend: bookingTrend, isUp: isBookingUp } = calculateTrend(
    currentMonthBookings.length,
    previousMonthBookings.length,
  );
  const { trend: revenueTrend, isUp: isRevenueUp } = calculateTrend(
    currentMonthExpenses,
    previousMonthExpenses,
  );

  const { pending, completed, canceled } =
    calculateBookingCountPerStatus(bookings);

  const {
    pending: revenuePending,
    completed: revenueCompleted,
    canceled: revenueCanceled,
  } = calculateRevenuePerStatus(bookings);

  return {
    totalBookings,
    totalAmount,
    sortedBookings,
    bookingTrend,
    isBookingUp,
    revenueTrend,
    isRevenueUp,
    currentMonthExpenses,
    previousMonthExpenses,
    bookingStatusCount: {
      pending,
      completed,
      canceled,
    },
    revenueStatusCount: {
      pending: revenuePending,
      completed: revenueCompleted,
      canceled: revenueCanceled,
    },
  };
};

export const getTotalVans = async (vans: Van[]) => vans.length;

export const calculateRatingStats = (reviews: any[]) => {
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
  const recentRating = reviews[reviews.length - 1]?.rating || 0;

  return {
    totalReviews,
    averageRating: averageRating.toFixed(1),
    recentRating,
  };
};

export const fetchBookings = async (
  userId: string,
): Promise<BookingWithVan[]> => {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId,
    },
    include: {
      van: true,
    },
  });
  await prisma.$disconnect();
  return bookings;
};

export const fetchUserData = async (
  userId: string,
): Promise<FetchUserDataResult> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      bookings: {
        include: {
          van: true,
        },
      },
      payments: {
        include: {
          booking: true,
        },
      },
      notifications: true,
      reviews: {
        include: {
          van: true,
        },
      },
      vansRented: {
        include: {
          reviews: true,
        },
      },
    },
  });
  return user;
};

export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export function getRecentElements<T>(
  elements: T[],
  sortProperty: keyof T,
  limit: number = 3,
): T[] {
  if (!elements || elements.length === 0) {
    return [];
  }

  const sortedElements = [...elements].sort((a, b) => {
    const valueA = a[sortProperty];
    const valueB = b[sortProperty];

    const dateA = valueA instanceof Date ? valueA : new Date(valueA as string);
    const dateB = valueB instanceof Date ? valueB : new Date(valueB as string);

    return dateA.getTime() - dateB.getTime();
  });

  return sortedElements.slice(0, limit);
}

export const fetchReviewsWithVans = async (
  userId: string,
): Promise<ReviewWithVan[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      userId: userId,
    },
    include: {
      van: true,
    },
  });

  return reviews;
};

export const determineHowManyDaysAgo = (date: Date): number => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
