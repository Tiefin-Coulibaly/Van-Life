import ImageDropzone from "@/components/dashboard/profile/ImageDropzone";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Profile Image | Van Life Dashboard",
  description: "Upload or update your profile picture for your Van Life account to personalize your experience."
};

const ImageUpload = async () => {

  return <ImageDropzone />;
};

export default ImageUpload;
