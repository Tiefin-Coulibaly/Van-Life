// Helper function to format date strings consistently
export const formatDateForDisplay = (dateString: string) => {
  // Extract the parts directly from the ISO string
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Format using the native Intl API
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  // Create a date with noon UTC time to avoid timezone issues
  return formatter.format(new Date(Date.UTC(year, month - 1, day, 12, 0, 0)));
};

export const calculateTotalPrice = (startDateStr: string, endDateStr: string, pricePerDay: number) => {
  if (!startDateStr || !endDateStr) {
    return { totalPrice: 0, diffDays: 0 };
  }

  // Parse dates in a timezone-safe way
  const [startYear, startMonth, startDay] = startDateStr.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDateStr.split('-').map(Number);
  
  const startDate = new Date(startYear, startMonth - 1, startDay, 12, 0, 0);
  const endDate = new Date(endYear, endMonth - 1, endDay, 12, 0, 0);

  // Calculate difference in milliseconds and convert to days
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate total price
  const totalPrice = diffDays * pricePerDay;
  
  return { totalPrice, diffDays,  formattedStartDate: formatDateForDisplay(startDateStr), formattedEndDate: formatDateForDisplay(endDateStr) };
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
