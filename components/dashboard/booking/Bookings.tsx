import BookingsTable from "./BookingsTable";
const Bookings = () => {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Bookings</h2>
        <BookingsTable/>
        {/* <ul>
          {[{ id: 1, van: "Nomadic Spirit", date: "March 15, 2025", status: "Confirmed" }].map((booking) => (
            <li key={booking.id} className="flex justify-between items-center border-b py-3">
              <span className="text-gray-800">{booking.van} - {booking.date}</span>
              <span className="text-green-600 font-semibold">{booking.status}</span>
            </li>
          ))}
        </ul> */}
      </section>
    );
  };
  
  export default Bookings;
  