import { Metadata } from "next";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";

import Contact from "@/components/Contact";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "Van Life | Adventure Awaits",
  description: "Rent high-quality vans for your next adventure with Van Life.",
  icons: {
    icon: "/images/logo/company-logo_svg.png",
  },
};

export default async function Home () {
  return (
    <main>
      <Hero />
      <CTA />
      <FAQ />
      <Testimonial />
      <Contact />
    </main>
  );
}
