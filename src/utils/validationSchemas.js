import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required").max(50, "First Name cannot exceed 50 characters"),
  lastName: z.string().trim().min(1, "Last Name is required").max(50, "Last Name cannot exceed 50 characters"),
  email: z.string().trim().toLowerCase().min(1, "Email is required").email("Invalid email address"),
  mobile: z.string().trim().min(1, "Mobile number is required").regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password cannot exceed 100 characters"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
  otp: z.string().trim().length(6, "OTP must be exactly 6 digits"),
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

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
export const SUPPORTED_REEL_FORMATS = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/quicktime",
];

export const personalDetailsSchema = z.object({
  bio: z
    .string()
    .min(1, "Bio is required")
    .min(20, "Bio must be at least 20 characters")
    .max(300, "Bio cannot exceed 300 characters"),

  age: z
    .string()
    .min(1, "Age is required")
    .or(z.number())
    .transform((val) => Number(val))
    .pipe(
      z
        .number()
        .min(18, "You must be at least 18 years old")
        .max(100, "Please enter a valid age")
    ),

  location: z
    .string()
    .min(1, "Location is required")
    .min(2, "Location must be at least 2 characters"),

  hobbies: z
    .string()
    .min(1, "Hobbies are required")
    .min(3, "Please describe your hobbies in more detail"),

  interests: z
    .string()
    .min(1, "Interests are required")
    .min(3, "Please describe your interests in more detail"),

  smoking: z
    .string()
    .min(1, "Please select your smoking habit")
    .refine(
      (val) => ["Never", "Occasionally", "Regularly", "Quit"].includes(val),
      { message: "Please select a valid smoking option" }
    ),

  drinking: z
    .string()
    .min(1, "Please select your drinking habit")
    .refine(
      (val) => ["Never", "Occasionally", "Regularly", "Quit"].includes(val),
      { message: "Please select a valid drinking option" }
    ),

  qualification: z
    .string()
    .min(1, "Qualification is required")
    .min(2, "Please enter your qualification"),

  gender: z
    .string()
    .min(1, "Please select your gender")
    .refine(
      (val) => ["Male", "Female", "Other"].includes(val),
      { message: "Please select a valid gender" }
    ),

  profile: z
    .any()
    .transform((val) => {
      if (val instanceof (typeof FileList !== "undefined" ? FileList : Array)) return Array.from(val);
      if (Array.isArray(val)) return val;
      if (val && typeof val === "object") return [val];
      return [];
    })
    .refine((files) => files.length > 0, "Profile picture is required")
    .refine((files) => {
      const file = files[0];
      if (!file) return true;
      if (file.url) return true;
      return !file.type || SUPPORTED_FORMATS.includes(file.type);
    }, "Only JPG, JPEG, PNG, or GIF formats are supported")
    .refine((files) => {
      const file = files[0];
      if (!file) return true;
      if (file.url) return true;
      return !file.size || file.size <= 5 * 1024 * 1024;
    }, "Profile picture must be less than 5MB"),

  additionalImg: z
    .any()
    .transform((val) => {
      if (val instanceof (typeof FileList !== "undefined" ? FileList : Array)) return Array.from(val);
      if (Array.isArray(val)) return val;
      if (val && typeof val === "object") return [val];
      return [];
    })
    .refine((files) => files.length >= 1, "Please upload at least one image")
    .refine((files) => files.length <= 3, "Please upload at most 3 images")
    .refine((files) => {
      return files.every((f) => {
        if (!f) return true;
        if (f.url) return true;
        return !f.type || SUPPORTED_FORMATS.includes(f.type);
      });
    }, "All images must be JPG, JPEG, PNG, or GIF")
    .refine((files) => {
      return files.every((f) => {
        if (!f) return true;
        if (f.url) return true;
        return !f.size || f.size <= 5 * 1024 * 1024;
      });
    }, "Each image must be less than 5MB"),

  reel: z
    .any()
    .transform((val) => {
      if (val instanceof (typeof FileList !== "undefined" ? FileList : Array)) return Array.from(val);
      if (Array.isArray(val)) return val;
      if (val && typeof val === "object") return [val];
      return [];
    })
    .refine((files) => files.length > 0, "Short reel is required")
    .refine((files) => {
      const file = files[0];
      if (!file) return true;
      if (file.url) return true;
      return !file.type || SUPPORTED_REEL_FORMATS.includes(file.type);
    }, "Supported formats: MP4, OGG, WebM, QuickTime")
    .refine((files) => {
      const file = files[0];
      if (!file) return true;
      if (file.url) return true;
      return !file.size || file.size <= 10 * 1024 * 1024;
    }, "Reel must be less than 10MB"),
});
