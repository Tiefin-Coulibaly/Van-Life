import AboutUs from "@/components/aboutUs/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Van Life",
  description:
    "Learn about our mission, values, and the team behind Van Life. Discover how we're making van travel accessible and enjoyable for everyone.",
};

const AboutUsPage = () => {
  return <AboutUs />;
};

export default AboutUsPage;
