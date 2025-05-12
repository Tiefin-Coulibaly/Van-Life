"use server";
import { metadata } from "@/app/(site)/page";
import { prisma } from "@/prisma/prisma";
import {
  Booking,
  BookingStatus,
  NotificationType,
  PaymentMethod,
} from "@prisma/client";
import Stripe from "stripe";
import { determineBookingStatus, formatDateForDisplay } from "../utils/booking";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const handleBooking = async (
  vanId: string,
  userId: string,
  name: string,
  description: string,
  images: string[],
  price: number,
  startDate: string,
  endDate: string,
  diffDays: number,
  totalPrice: number,
): Promise<Stripe.Checkout.Session> => {
  const userSession = await auth();
  if (!userSession) {
    redirect("/auth/signin?callbackUrl=/vans");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
            description: description,
            images: images,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      vanId,
      userId,
      vanName: name,
      startDate,
      endDate,
      daysBooked: diffDays,
      dailyRate: price,
      totalPrice,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment/payment-cancel`,
  });

  return session;
};

export const createBookingTableAfterPayment = async (
  vanId: string,
  userId: string,
  startDate: string,
  endDate: string,
  status: BookingStatus,
  totalPrice: number,
  stripeSessionId: string,
): Promise<Booking> => {
  const startDateObj = new Date(`${startDate}T12:00:00Z`);
  const endDateObj = new Date(`${endDate}T12:00:00Z`);

  const booking = await prisma.booking.create({
    data: {
      vanId,
      userId,
      startDate: startDateObj,
      endDate: endDateObj,
      status,
      totalAmount: totalPrice,
      stripeSessionId,
    },
  });

  return booking;
};

export const createPaymentTableAfterPayment = async (
  userId: string,
  vanId: string,
  bookingId: string,
  method: PaymentMethod,
  stripePaymentId: string,
  receiptUrl: string,
) => {
  const payment = await prisma.payment.create({
    data: {
      userId,
      vanId,
      bookingId,
      method,
      stripePaymentId,
      receiptUrl,
    },
  });

  return payment;
};

export const createNotificationTableAfterPayment = async (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
) => {
  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
    },
  });

  return notification;
};

const getReceiptURL = async (
  session: Stripe.Checkout.Session,
): Promise<string> => {
  let paymentIntentId = "";
  let receiptUrl = "";

  if (session.payment_intent) {
    if (typeof session.payment_intent === "string") {
      paymentIntentId = session.payment_intent;
    } else {
      paymentIntentId = session.payment_intent.id;
    }
  }

  if (paymentIntentId) {
    try {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);

      const chargeId = paymentIntent.latest_charge as string | undefined;

      if (chargeId) {
        const charge = await stripe.charges.retrieve(chargeId);
        receiptUrl = charge.receipt_url || "";
      }
    } catch (error) {
      console.error("Error retrieving payment details:", error);
    }
  }

  return receiptUrl;
};

const updateUserVansRented = async (userId: string, vanId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        vansRented: {
          where: { id: vanId },
          select: { id: true },
        },
      },
    });
    if (user && user.vansRented.length === 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          vansRented: {
            connect: { id: vanId },
          },
        },
      });
      console.log(
        `Added van ${vanId} to user ${userId}'s vansRented collection`,
      );
    } else {
      console.log(
        `Van ${vanId} already in user ${userId}'s vansRented collection`,
      );
    }
  } catch (error) {
    console.error("Error updating user's vansRented collection:", error);
  }
};

export const generateReceiptData = async (sessionId: string) => {
  try {
    console.log("Starting receipt generation for session:", sessionId);
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        "payment_intent",
        "customer",
        "payment_intent.charges",
        "line_items",
      ],
    });

    if (!session) {
      throw new Error("Session not found");
    }

    const metadata = session.metadata!;
    console.log("Session metadata:", metadata);

    // First, handle all database operations
    const bookingStatus = determineBookingStatus(session.payment_status);

    const paymentMethod =
      session.payment_method_types[0].toUpperCase() === "CARD"
        ? PaymentMethod.Card
        : PaymentMethod.Paypal;

    const receiptUrl = await getReceiptURL(session);

    // Check if booking already exists to prevent duplicates
    const existingBooking = await prisma.booking.findFirst({
      where: { stripeSessionId: sessionId },
    });

    let booking;
    if (existingBooking) {
      console.log("Booking already exists:", existingBooking.id);
      booking = existingBooking;
    } else {
      booking = await createBookingTableAfterPayment(
        metadata.vanId,
        metadata.userId,
        metadata.startDate,
        metadata.endDate,
        bookingStatus as BookingStatus,
        Number(metadata.totalPrice),
        sessionId,
      );
    }

    // Get payment ID from session
    const stripePaymentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    // Check if payment already exists
    const existingPayment = await prisma.payment.findFirst({
      where: { stripePaymentId: stripePaymentId as string },
    });

    let payment;
    if (existingPayment) {
      console.log("Payment already exists:", existingPayment.id);
      payment = existingPayment;
    } else if (stripePaymentId) {
      payment = await createPaymentTableAfterPayment(
        metadata.userId,
        metadata.vanId,
        booking.id,
        paymentMethod,
        stripePaymentId as string,
        receiptUrl,
      );
    }

    // Create notification (can have multiple, so no check needed)
    const notificationTitle = `Booking Confirmed for ${metadata.vanName}`;
    const notificationMessage = `Your booking for ${metadata.vanName} from ${formatDateForDisplay(
      metadata.startDate,
    )} to ${formatDateForDisplay(
      metadata.endDate,
    )} has been confirmed. Your payment of $${Number(metadata.totalPrice)} has been successfully processed.`;

    await createNotificationTableAfterPayment(
      metadata.userId,
      NotificationType.Booking,
      notificationTitle,
      notificationMessage,
    );

    // Update user's vans rented collection
    await updateUserVansRented(metadata.userId, metadata.vanId);

    // Helper function for date formatting
    const formatDate = (dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return dateString; // Return original if parsing fails
      }
    };

    // Return properly formatted receipt data
    return {
      receiptId: payment?.id || "N/A",
      bookingId: booking.id,
      vanName: metadata.vanName || "Van rental",
      startDate: formatDate(metadata.startDate),
      endDate: formatDate(metadata.endDate),
      daysBooked: parseInt(metadata.daysBooked) || 0,
      dailyRate: parseFloat(metadata.dailyRate) || 0,
      totalAmount: parseFloat(metadata.totalPrice) || 0,
      paymentDate: new Date().toLocaleDateString(),
      stripeReceiptUrl: receiptUrl,
      customerEmail: session.customer_details?.email || "Not provided",
      paymentStatus: session.payment_status,
    };
  } catch (error) {
    console.error("Error in generateReceiptData:", error);
    throw error;
  }
};
