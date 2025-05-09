"use server";

import { prisma } from "@/prisma/prisma";
import { saltAndHashPassword } from "./authActions";
import { IUpdateProfile } from "@/types/profileUpdate";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

const formatUserName = (userName: string): string => {
  let nameArray: string[] = userName.split(" ");
  nameArray = nameArray.map((name) => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1).toLocaleLowerCase()}`;
  });

  return nameArray.join(" ");
};

export const formatUserInformation = async (
  newUserProfileInformation: IUpdateProfile,
): Promise<IUpdateProfile> => {
  let formattedUserInformation = {};

  for (let key in newUserProfileInformation) {
    if (newUserProfileInformation[key]) {
      if (key === "email") {
        formattedUserInformation[key] =
          newUserProfileInformation[key].toLowerCase();
      } else if (key === "newPassword") {
        formattedUserInformation["password"] = await saltAndHashPassword(
          newUserProfileInformation[key],
        );
      } else if (key === "name") {
        formattedUserInformation[key] = formatUserName(
          newUserProfileInformation[key],
        );
      } else {
        formattedUserInformation[key] = newUserProfileInformation[key];
      }
    }
  }

  return formattedUserInformation;
};

export const updateUserProfileInformation = async (
  formattedUserInformation: IUpdateProfile,
  userId: string,
): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { ...formattedUserInformation },
  });
   revalidatePath("/");
  prisma.$disconnect();
 
};

export const uploadImageToCloudFare = async (imageData: {
  base64String: string;
  filename: string;
}) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(
      imageData.base64String,
      {
        filename_override: imageData.filename,
      },
    );

    const optimizedImageUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return optimizedImageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    throw error;
  }
};

export const updateUserImageInDb = async (userId: string, imageUrl: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error("Error updating user image:", error);
    throw error;
  }
};
