
import SectionHeader from "../SectionHeader";
import PaymentList from "./PaymentList";


const RecentPayments = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <SectionHeader title="Recent Payments" />
      <div className="space-y-4">
        <PaymentList/>
      </div>
    </div>
  );
};

export default RecentPayments;
