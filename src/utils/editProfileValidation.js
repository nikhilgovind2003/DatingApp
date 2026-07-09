import { z } from "zod";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const SUPPORTED_REEL_FORMATS = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/quicktime",
];


const stringFromUnknown = z.preprocess(
  (val) => (val === null || val === undefined ? val : String(val)),
  z.string()
);


const fileListSchema = z
  .any()
  .optional()
  .superRefine((value, ctx) => {
    if (!value) return;

    const files = Array.from(value || []);
    if (files.some((file) => !(file instanceof File))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid file format.",
      });
      return;
    }
  });

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(50, "First Name is too long"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .max(50, "Last Name is too long"),
  email: z.string().email("Invalid email address"),
  contact: stringFromUnknown
    .refine((val) => !!val, { message: "Phone number is required" })
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Mobile number must be exactly 10 digits",
    }),

  // Required
  age: stringFromUnknown
    .refine((val) => !!val, { message: "Age is required" })
    .refine(
      (val) =>
        !val ||
        (Number.isInteger(Number(val)) &&
          Number(val) >= 18 &&
          Number(val) <= 100),
      { message: "Age must be a whole number between 18 and 100" },
    ),

  gender: z.enum(["Male", "Female", "Other", ""]).optional(),
  location: z.string().min(1, "location is required").max(100, "Location is too long").optional(),
  hobbies: z.string().max(120, "Hobbies is too long").optional(),
  interests: z.string().max(120, "Interests is too long").optional(),
  drinking: z.string().optional(),
  smoking: z.string().optional(),
  qualification: z.string().min(1, "Qualification is required").max(100, "Qualification is too long").optional(),
  bio: z.string().max(300, "Bio cannot exceed 300 characters").optional(),
  profileImage: fileListSchema.superRefine((value, ctx) => {
    if (!value || value.length === 0) return;
    const file = value[0];
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Profile image must be JPG, PNG, or GIF",
      });
    }
  }),
  reel: fileListSchema.superRefine((value, ctx) => {
    if (!value || value.length === 0) return;
    const file = value[0];
    if (!SUPPORTED_REEL_FORMATS.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reel must be MP4, OGG, WEBM, or MOV",
      });
    }
  }),
  additionalImages: fileListSchema.superRefine((value, ctx) => {
    if (!value || value.length === 0) return;
    if (value.length > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You can upload up to 3 additional images",
      });
      return;
    }

    const files = Array.from(value);
    const invalid = files.filter(
      (file) => !SUPPORTED_FORMATS.includes(file.type),
    );
    if (invalid.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Additional images must be JPG, PNG, or GIF",
      });
    }
  }),
});
