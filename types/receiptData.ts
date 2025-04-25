export interface IReceiptData {
  receiptId: string;

  bookingId: string;

  vanName: string;

  startDate: string;

  endDate: string;

  daysBooked: number | string;

  dailyRate: number | string;

  totalAmount: string | number;

  paymentDate: Date;

  stripeReceiptUrl: string;

  customerEmail?: string | null;
}
