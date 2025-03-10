import PaymentsTable from "./PaymentsTable";

const Payments = () => {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Payments</h2>
        <PaymentsTable/>
        {/* <ul>
          {[{ id: 1, amount: "$250", date: "Feb 20, 2025", status: "Completed" }].map((payment) => (
            <li key={payment.id} className="flex justify-between items-center border-b py-3">
              <span className="text-gray-800">{payment.amount} - {payment.date}</span>
              <span className="text-green-600 font-semibold">{payment.status}</span>
            </li>
          ))}
        </ul> */}
      </section>
    );
  };
  
  export default Payments;
  