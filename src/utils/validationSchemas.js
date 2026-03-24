import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
  otp: z.string().min(1, "OTP is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email or mobile is required").refine(
    (val) => /\S+@\S+\.\S+/.test(val) || /^\d{10}$/.test(val),
    { message: "Enter a valid email or 10-digit mobile number" }
  ),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const SUPPORTED_REEL_FORMATS = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/quicktime",
];

export const personalDetailsSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  age: z.string().or(z.number()).transform((val) => Number(val)).pipe(
    z.number().min(18, "You must be at least 18 years old")
  ),
  location: z.string().min(1, "Location is required"),
  hobbies: z.string().min(1, "Hobbies are required"),
  interests: z.string().min(1, "Interests are required"),
  smoking: z.string().min(1, "Smoking habits are required"),
  drinking: z.string().min(1, "Drinking habits are required"),
  qualification: z.string().min(1, "Qualifications are required"),
  gender: z.string().min(1, "Gender is required"),
  profile: z.any().refine((files) => files?.length === 1, "Provide one profile pic")
    .refine((files) => !files?.[0] || SUPPORTED_FORMATS.includes(files[0]?.type), "Unsupported image format"),
  additionalImg: z.any().refine((files) => files?.length === 3, "Exactly 3 images are required"),
  reel: z.any()
    .refine((files) => files?.length === 1, "Provide a short reel")
    .refine((files) => !files?.[0] || SUPPORTED_REEL_FORMATS.includes(files[0]?.type), "Unsupported video format")
    .refine((files) => !files?.[0] || files[0]?.size <= 10 * 1024 * 1024, "Reel must be less than 10MB"),
});
