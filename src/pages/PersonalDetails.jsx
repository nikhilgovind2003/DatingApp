import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

// shadcn components
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const SUPPORTED_REEL_FORMATS = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/quicktime",
];

const personalDetailsSchema = z.object({
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
      (val) => ["Never", "Occasionally", "Regularly"].includes(val),
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
    .refine(
      (files) => files?.length === 1,
      "Profile picture is required"
    )
    .refine(
      (files) => !files?.[0] || SUPPORTED_FORMATS.includes(files[0]?.type),
      "Only JPG, JPEG, PNG, or GIF formats are supported"
    )
    .refine(
      (files) => !files?.[0] || files[0]?.size <= 5 * 1024 * 1024,
      "Profile picture must be less than 5MB"
    ),

  additionalImg: z
    .any()
    .refine(
      (files) => Array.isArray(files) && files.length === 3,
      "Exactly 3 additional images are required"
    )
    .refine(
      (files) =>
        !Array.isArray(files) ||
        files.every((f) => SUPPORTED_FORMATS.includes(f?.type)),
      "All images must be JPG, JPEG, PNG, or GIF"
    )
    .refine(
      (files) =>
        !Array.isArray(files) ||
        files.every((f) => f?.size <= 5 * 1024 * 1024),
      "Each image must be less than 5MB"
    ),

  reel: z
    .any()
    .refine(
      (files) => files?.length === 1,
      "A short reel is required"
    )
    .refine(
      (files) =>
        !files?.[0] || SUPPORTED_REEL_FORMATS.includes(files[0]?.type),
      "Supported formats: MP4, OGG, WebM, QuickTime"
    )
    .refine(
      (files) => !files?.[0] || files[0]?.size <= 10 * 1024 * 1024,
      "Reel must be less than 10MB"
    ),
});

// ─── Styled form input (shadcn-style) ─────────────────────────────────────────
const inputClasses =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

const selectClasses =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

const fileInputClasses =
  "flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

// ─── Component ────────────────────────────────────────────────────────────────
const PersonalDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalDetailsSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [profilePreview, setProfilePreview] = useState("");
  const [reelPreview, setReelPreview] = useState("");

  useEffect(() => {
    return () => {
      previewImages.forEach((img) => URL.revokeObjectURL(img.url));
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      if (reelPreview) URL.revokeObjectURL(reelPreview);
    };
  }, [previewImages, profilePreview, reelPreview]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("bio", data.bio);
      formData.append("age", data.age);
      formData.append("location", data.location);
      formData.append("hobbies", data.hobbies);
      formData.append("interests", data.interests);
      formData.append("smoking", data.smoking);
      formData.append("drinking", data.drinking);
      formData.append("qualification", data.qualification);
      formData.append("gender", data.gender);

      if (data.profile?.length > 0) {
        formData.append("profile", data.profile[0]);
      }

      // Send exactly 3 additional images
      if (data.additionalImg?.length === 3) {
        data.additionalImg.forEach((img) => {
          formData.append("additionalImg", img);
        });
      }

      if (data.reel?.length > 0) {
        formData.append("reel", data.reel[0]);
      }

      const res = await axios.post(
        "http://localhost:5000/api/v1/users/profile-details",
        formData,
        { withCredentials: true }
      );

      toast.success(res?.data?.message);

      if (res.data.success) {
        navigate("/job_status");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const additionalImgRegister = register("additionalImg");
  const profileRegister = register("profile");
  const reelRegister = register("reel");

  const removeAdditionalImage = (indexToRemove) => {
    setPreviewImages((prev) => {
      const imageToRemove = prev[indexToRemove];
      if (imageToRemove?.url) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      const updatedImages = prev.filter((_, index) => index !== indexToRemove);
      setValue(
        "additionalImg",
        updatedImages.map((img) => img.file),
        { shouldValidate: true, shouldDirty: true }
      );
      return updatedImages;
    });
  };

  const removeProfileImage = () => {
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview);
    }
    setProfilePreview("");
    setValue("profile", [], { shouldValidate: true, shouldDirty: true });
  };

  const removeReel = () => {
    if (reelPreview) {
      URL.revokeObjectURL(reelPreview);
    }
    setReelPreview("");
    setValue("reel", [], { shouldValidate: true, shouldDirty: true });
  };

  const getFieldErrorMessage = (fieldError) =>
    fieldError?.message || fieldError?.root?.message || "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="flex flex-col min-h-screen p-4 lg:w-2/5 z-0">
        <div className="bg-white/70 backdrop-blur-md border border-white/40 p-8 mt-14 mb-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <h2 className="mb-8 text-3xl font-extrabold text-center text-deep-plum tracking-tight">
            Personal Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Bio */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <FormLabel htmlFor="bio" error={!!errors.bio}>
                Bio
              </FormLabel>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself (min 20 characters)"
                aria-invalid={!!errors.bio}
                className="bg-white/50 backdrop-blur-sm focus:bg-white transition-all min-h-[100px]"
                {...register("bio")}
              />
              <div className="h-4">
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.bio?.message}
                </FormMessage>
              </div>
            </FormItem>

            {/* Age & Gender Row */}
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
              <FormItem>
                <FormLabel htmlFor="age" error={!!errors.age}>
                  Age
                </FormLabel>
                <input
                  type="number"
                  id="age"
                  placeholder="18+"
                  aria-invalid={!!errors.age}
                  className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                  {...register("age")}
                />
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.age?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="gender" error={!!errors.gender}>
                  Gender
                </FormLabel>
                <select
                  id="gender"
                  aria-invalid={!!errors.gender}
                  className={cn(selectClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all appearance-none")}
                  {...register("gender")}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.gender?.message}
                </FormMessage>
              </FormItem>
            </div>

            {/* Location */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <FormLabel htmlFor="location" error={!!errors.location}>
                Location
              </FormLabel>
              <input
                type="text"
                id="location"
                placeholder="Where do you live?"
                aria-invalid={!!errors.location}
                className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                {...register("location")}
              />
              <FormMessage className="animate-in fade-in duration-200">
                {errors.location?.message}
              </FormMessage>
            </FormItem>

            {/* Hobbies & Interests */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <FormItem>
                <FormLabel htmlFor="hobbies" error={!!errors.hobbies}>
                  Hobbies
                </FormLabel>
                <input
                  type="text"
                  id="hobbies"
                  placeholder="Hiking, Reading, Cooking..."
                  aria-invalid={!!errors.hobbies}
                  className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                  {...register("hobbies")}
                />
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.hobbies?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="interests" error={!!errors.interests}>
                  Interests
                </FormLabel>
                <input
                  type="text"
                  id="interests"
                  placeholder="Music, Tech, Travel..."
                  aria-invalid={!!errors.interests}
                  className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                  {...register("interests")}
                />
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.interests?.message}
                </FormMessage>
              </FormItem>
            </div>

            {/* Habits Row */}
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-800">
              <FormItem>
                <FormLabel htmlFor="smoking" error={!!errors.smoking}>
                  Smoking
                </FormLabel>
                <select
                  id="smoking"
                  aria-invalid={!!errors.smoking}
                  className={cn(selectClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all appearance-none")}
                  {...register("smoking")}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Regularly">Regularly</option>
                  <option value="Quit">Quit</option>
                </select>
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.smoking?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="drinking" error={!!errors.drinking}>
                  Drinking
                </FormLabel>
                <select
                  id="drinking"
                  aria-invalid={!!errors.drinking}
                  className={cn(selectClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all appearance-none")}
                  {...register("drinking")}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Regularly">Regularly</option>
                </select>
                <FormMessage className="animate-in fade-in duration-200">
                  {errors.drinking?.message}
                </FormMessage>
              </FormItem>
            </div>

            {/* Qualification */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <FormLabel htmlFor="qualification" error={!!errors.qualification}>
                Qualification
              </FormLabel>
              <input
                type="text"
                id="qualification"
                placeholder="Your education level"
                aria-invalid={!!errors.qualification}
                className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                {...register("qualification")}
              />
              <FormMessage className="animate-in fade-in duration-200">
                {errors.qualification?.message}
              </FormMessage>
            </FormItem>

            <hr className="border-gray-300/50" />

            {/* Profile Picture */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <FormLabel error={!!errors.profile} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-deep-plum animate-pulse" />
                Profile Picture
              </FormLabel>
              <div className="group relative">
                <input
                  type="file"
                  id="profile"
                  accept="image/jpg,image/jpeg,image/png,image/gif"
                  aria-invalid={!!errors.profile}
                  name={profileRegister.name}
                  ref={profileRegister.ref}
                  onBlur={profileRegister.onBlur}
                  onChange={(e) => {
                    profileRegister.onChange(e);
                    const file = e.target.files?.[0];
                    if (!file) {
                      if (profilePreview) URL.revokeObjectURL(profilePreview);
                      setProfilePreview("");
                      setValue("profile", [], {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      return;
                    }
                    if (profilePreview) URL.revokeObjectURL(profilePreview);
                    setProfilePreview(URL.createObjectURL(file));
                    setValue("profile", [file], {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                  className={cn(fileInputClasses, "bg-white/30 hover:bg-white/50 transition-colors")}
                />
              </div>
              <FormMessage>{getFieldErrorMessage(errors.profile)}</FormMessage>
              {profilePreview && (
                <div className="relative w-24 h-24 mt-4 animate-in zoom-in-75 duration-300">
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover rounded-xl border-2 border-white shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white text-xs flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                  >
                    ✕
                  </button>
                </div>
              )}
            </FormItem>

            {/* Additional Images */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <FormLabel error={!!errors.additionalImg} className="flex justify-between items-center">
                <span>Additional Images</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full",
                  previewImages.length === 3 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                )}>
                  {previewImages.length}/3 uploaded
                </span>
              </FormLabel>
              <FormDescription>Exactly 3 high-quality photos required.</FormDescription>
              <input
                type="file"
                multiple
                id="additionalImg"
                accept="image/jpg,image/jpeg,image/png,image/gif"
                aria-invalid={!!errors.additionalImg}
                name={additionalImgRegister.name}
                ref={additionalImgRegister.ref}
                onBlur={additionalImgRegister.onBlur}
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const existingFiles = previewImages.map((img) => img.file);
                  const combinedFiles = [...existingFiles, ...files];

                  if (combinedFiles.length > 3) {
                    toast.error("You can upload up to 3 additional images only.");
                    e.target.value = "";
                    setValue("additionalImg", existingFiles, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    return;
                  }

                  const newPreviews = files.map((file) => ({
                    file,
                    url: URL.createObjectURL(file),
                  }));

                  setPreviewImages((prev) => [...prev, ...newPreviews]);
                  setValue("additionalImg", combinedFiles, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  e.target.value = "";
                }}
                className={cn(fileInputClasses, "bg-white/30 hover:bg-white/50 transition-colors")}
              />
              <FormMessage>{getFieldErrorMessage(errors.additionalImg)}</FormMessage>

              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative aspect-square animate-in zoom-in-75 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <img
                        src={img.url}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl border-2 border-white shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white text-xs flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FormItem>

            {/* Reel */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-1000">
              <FormLabel error={!!errors.reel} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Short Reel
              </FormLabel>
              <input
                type="file"
                id="reel"
                accept="video/mp4,video/ogg,video/webm,video/quicktime"
                aria-invalid={!!errors.reel}
                name={reelRegister.name}
                ref={reelRegister.ref}
                onBlur={reelRegister.onBlur}
                onChange={(e) => {
                  reelRegister.onChange(e);
                  const file = e.target.files?.[0];
                  if (!file) {
                    if (reelPreview) URL.revokeObjectURL(reelPreview);
                    setReelPreview("");
                    setValue("reel", [], {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    return;
                  }
                  if (reelPreview) URL.revokeObjectURL(reelPreview);
                  setReelPreview(URL.createObjectURL(file));
                  setValue("reel", [file], {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
                className={cn(fileInputClasses, "bg-white/30 hover:bg-white/50 transition-colors")}
              />
              <FormMessage>{getFieldErrorMessage(errors.reel)}</FormMessage>
              {reelPreview && (
                <div className="relative w-full aspect-video mt-4 animate-in zoom-in-75 duration-300">
                  <video
                    src={reelPreview}
                    controls
                    className="w-full h-full object-cover rounded-xl border-2 border-white shadow-md bg-black"
                  />
                  <button
                    type="button"
                    onClick={removeReel}
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-destructive text-white text-base flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                  >
                    ✕
                  </button>
                </div>
              )}
            </FormItem>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 bg-deep-plum hover:bg-hot-purple text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Save Profile Details"
              )}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;