import React from "react";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support | Van Life",
  description:
    "Get help with your Van Life bookings, rentals, or account. Our support team is ready to assist you with any questions or issues.",
};

const SupportPage = () => {
  return (
    <div className="pb-20 pt-50">
      <Contact />
    </div>
  );
};

export default SupportPage;
