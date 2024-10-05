import { z } from "zod";

export const idSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
});

export const emailAndOTPSchema = emailSchema.extend({
  otp: z
    .string({
      required_error: "OTP is required",
      invalid_type_error: "OTP must be a string",
    })
    .length(6, "OTP must be 6 characters"),
});

export const passwordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters"),
});

export const tokenSchema = z.object({
  token: z
    .string({
      required_error: "Token is required",
      invalid_type_error: "Token must be a string",
    })
    .length(36, "Token must be 36 characters"),
});

export const resetPasswordSchema = z.object({
  ...emailSchema.shape,
  ...tokenSchema.shape,
  ...passwordSchema.shape,
});
