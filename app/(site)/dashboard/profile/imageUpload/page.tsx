import ImageDropzone from "@/components/dashboard/profile/ImageDropzone";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ImageUpload = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  return <ImageDropzone />;
};

export default ImageUpload;
