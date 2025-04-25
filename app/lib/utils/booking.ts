export const calculateTotalPrice = (
  startDate: string,
  endDate: string,
  price: number,
): { totalPrice: number; diffDays: number } => {
  if (!startDate || !endDate) return { totalPrice: 0, diffDays: 0 };

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { totalPrice: diffDays * price, diffDays };
};

export const determineBookingStatus = (paymentStatus: string): string => {
  switch (paymentStatus) {
    case "paid":
      return "Confirmed";
    case "unpaid":
      return "Canceled";
    default:
      return "Pending";
  }
};
