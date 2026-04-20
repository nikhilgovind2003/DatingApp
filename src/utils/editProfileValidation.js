import { z } from "zod";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const SUPPORTED_REEL_FORMATS = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/quicktime",
];

export const editProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "First Name is too long"),
  lastName: z.string().min(1, "Last Name is required").max(50, "Last Name is too long"),
  email: z.string().email("Invalid email address"),
  contact: z
    .string()
    .optional()
    .or(z.number())
    .refine((val) => val === "" || val === undefined || val === null || /^\d{10}$/.test(String(val)), {
      message: "Mobile number must be exactly 10 digits",
    }),
  
  age: z
    .string()
    .optional()
    .or(z.number())
    .refine((val) => val === "" || (Number(val) >= 18 && Number(val) <= 100), {
      message: "Age must be between 18 and 100",
    }),

  gender: z
    .enum(["Male", "Female", "Other", ""])
    .optional(),

  location: z.string().optional(),

  hobbies: z.string().optional(),

  interests: z.string().optional(),

  drinking: z
    .enum(["Never", "Quit", "Occasionally", "Regularly"])
    .optional(),

  smoking: z
    .enum(["Never", "Quit", "Occasionally", "Regularly"])
    .optional(),

  qualification: z.string().optional(),

  bio: z.string().max(300, "Bio cannot exceed 300 characters").optional(),

  // For files, we usually allow them to bypass strict validation in general edit profile unless explicitly changed, 
  // but we can add basic checks if they are instances of File.
  profileImage: z.any().optional(),
  reel: z.any().optional(),
  additionalImages: z.any().optional(),
});
