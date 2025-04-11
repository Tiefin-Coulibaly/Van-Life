import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const profileUpdateSchema = object({
  name: string().optional(),
  email: string().optional().refine(
    val => !val || val.includes('@'), // Only validate if value exists
    { message: "Invalid email" }
  ),
  newPassword: string().optional().refine(
    val => !val || (val.length >= 6 && val.length <= 32),
    { message: "Password must be between 6 and 32 characters" }
  ),
});

export const passwordSchema = object({
    password: string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
