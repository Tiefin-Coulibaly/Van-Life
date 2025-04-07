"use server";

import { prisma } from "@/prisma/prisma";
import { saltAndHashPassword } from "./authActions";
import { IUpdateProfile } from "@/types/profileUpdate";


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

  prisma.$disconnect();
};
