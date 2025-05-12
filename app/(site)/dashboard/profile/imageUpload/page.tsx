import { auth } from "@/auth";
import ImageDropzone from "@/components/dashboard/profile/ImageDropzone";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Upload Profile Image | Van Life Dashboard",
  description: "Upload or update your profile picture for your Van Life account to personalize your experience."
};

const ImageUpload = async () => {
   const session = await auth();
      if (!session) redirect("/auth/signin?callbackUrl=dashboard/profile/imageUpload");

  return <ImageDropzone />;
};

export default ImageUpload;
