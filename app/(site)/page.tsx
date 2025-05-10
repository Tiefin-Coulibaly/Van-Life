import { Metadata } from "next";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";

import Contact from "@/components/Contact";
import Testimonial from "@/components/Testimonial";


export const metadata: Metadata = {
  title: "Next.js Starter Template for SaaS Startups - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Home for Solid Pro",
};

export default function Home() {
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
