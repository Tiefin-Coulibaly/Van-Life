import { useState } from 'react';
import { FaTimes, FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';
import { calculateTotalPrice } from '@/app/lib/utils/booking';
import { set } from 'mongoose';

interface BookingModalProps {
  vanId: string;
  name: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
  onBooking: (startDate: Date, endDate: Date) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setDiffDays: (days: number) => void;
  setTotalPrice: (price: number) => void;
  startDate: string;
  endDate: string;
}

const BookingModal = ({ 
  vanId, 
  price, 
  name,
  isOpen, 
  onClose, 
  onBooking,
  setStartDate,
  setEndDate,
  setDiffDays,
  setTotalPrice,
  startDate,
  endDate,
}: BookingModalProps) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const minDate = format(today, "yyyy-MM-dd");

  const {totalPrice, diffDays} = calculateTotalPrice(startDate, endDate, price);
  if (totalPrice > 0) {
    setTotalPrice(totalPrice);
    setDiffDays(diffDays);
  }


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!startDate || !endDate) {
      setError("Please select both start and end dates");
      return;
    }
    
   

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setError("End date must be after start date");
      return;
    }

    setIsLoading(true);
    
    try {
      onBooking(start, end);
    } catch (err: any) {
      setError(err.message || "Something went wrong with your booking");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Book Your Van</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium text-gray-700">{name}</h3>
          <p className="text-gray-600">${price} per day</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label 
              htmlFor="startDate" 
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaCalendar className="text-gray-400" />
              </div>
              <input
                type="date"
                id="startDate"
                min={minDate}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-black focus:ring-black sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label 
              htmlFor="endDate" 
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaCalendar className="text-gray-400" />
              </div>
              <input
                type="date"
                id="endDate"
                min={startDate || minDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-black focus:ring-black sm:text-sm"
                disabled={!startDate}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          
          {startDate && endDate && (
            <div className="rounded-md bg-gray-50 p-3">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {format(new Date(startDate), "MMM dd, yyyy")} - {format(new Date(endDate), "MMM dd, yyyy")}
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !startDate || !endDate}
              className={`rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 
                ${isLoading || !startDate || !endDate 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800'}`}
            >
              {isLoading ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;