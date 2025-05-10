import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Van Life",
  description:
    "Find answers to common questions about van rentals, booking process, payments, and other inquiries about using Van Life services.",
};

const FAQPage = () => {
  return (
    <div className="pb-20 pt-50">
      <FAQ />
    </div>
  );
};

export default FAQPage;
