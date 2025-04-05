"use server";

import { prisma } from "@/prisma/prisma";
import { saltAndHashPassword } from "./authActions";
import { IUpdateProfile } from "@/types/profileUpdate";

export const updateProfile = async (formData: IUpdateProfile) => {
  let newData = {};

  for (let key in formData) {
    if (formData[key]) {
      if (key === "email") {
        newData[key] = formData[key].toLowerCase();
      } else {
        newData[key] = formData[key];
      }
    }
  }

  

  console.log(newData);
};
