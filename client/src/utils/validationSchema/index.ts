import { z } from "zod";

export const SignUpTypeSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must contain at least 5 characters",
    })
    .max(15, { message: "Name must be less than 15 characters" })
    .refine((data) => !/\d/.test(data), {
      message: "Name must not contain a number",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

export const SignInTypeSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});
