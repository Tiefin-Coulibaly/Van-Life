import TermsOfService from "@/components/termsOfServices/TermsOfServices";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Terms of Service - Van Life",
  description: "Terms and conditions for using the Van Life van rental platform."
};

export default function TermsPage() {
  return <TermsOfService />;
}