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
    })
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    }),
  email: z
    .string()
    .email()
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    }),
  contact: z
    .string()
    .min(10, { message: "Enter a valid contact number" })
    .max(15, { message: "contact must be less than 15 characters" })
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    })
    .refine((data) => parseInt(data, 10) > 100000, {
      message: "Enter a valid contact",
    })
    .refine((data) => /^\d+$/.test(data), {
      message: "Enter a valid contact with only numbers",
    }),
});

export const SignInTypeSchema = z.object({
  email: z
    .string()
    .email()
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" })
    .refine((data) => data.trim() === data, {
      message: "Trailing spaces are not allowed.",
    }),
});

export const EditInputValidation = z.object({
  name: SignUpTypeSchema.shape.name,
  email: SignUpTypeSchema.shape.email,
  contact: SignUpTypeSchema.shape.contact,
});
