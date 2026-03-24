import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
      z.number()
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
    mode: "onChange",
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

      if (data.additionalImg?.length > 0) {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
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
      <div className="flex flex-col min-h-screen p-4 lg:w-2/5">
        <div className="bg-white p-6 mt-14 mb-10 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h2 className="mb-5 text-2xl font-bold text-center">
            Personal Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Bio */}
            <div className="mb-4">
              <label htmlFor="bio" className="block text-gray-700">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                {...register("bio")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.bio && (
                <p className="text-red-600">{errors.bio.message}</p>
              )}
            </div>

            {/* Age */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                {...register("age")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.age && (
                <p className="text-red-600">{errors.age.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                {...register("location")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.location && (
                <p className="text-red-600">{errors.location.message}</p>
              )}
            </div>

            {/* Hobbies */}
            <div className="mb-4">
              <label htmlFor="hobbies" className="block text-gray-700">
                Hobbies
              </label>
              <input
                type="text"
                id="hobbies"
                {...register("hobbies")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.hobbies && (
                <p className="text-red-600">{errors.hobbies.message}</p>
              )}
            </div>

            {/* Interests */}
            <div className="mb-4">
              <label htmlFor="interests" className="block text-gray-700">
                Interests
              </label>
              <input
                type="text"
                id="interests"
                {...register("interests")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.interests && (
                <p className="text-red-600">{errors.interests.message}</p>
              )}
            </div>

            {/* Smoking */}
            <div className="mb-4">
              <label htmlFor="smoking" className="block text-gray-700">
                Smoking Habits
              </label>
              <select
                id="smoking"
                {...register("smoking")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              >
                <option value="">Select Smoking Habit</option>
                <option value="Never">Never</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Regularly">Regularly</option>
                <option value="Quit">Quit</option>
              </select>
              {errors.smoking && (
                <p className="text-red-600">{errors.smoking.message}</p>
              )}
            </div>

            {/* Drinking */}
            <div className="mb-4">
              <label htmlFor="drinking" className="block text-gray-700">
                Drinking Habits
              </label>
              <select
                id="drinking"
                {...register("drinking")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              >
                <option value="">Select Drinking Habit</option>
                <option value="Never">Never</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Regularly">Regularly</option>
              </select>
              {errors.drinking && (
                <p className="text-red-600">{errors.drinking.message}</p>
              )}
            </div>

            {/* Qualification */}
            <div className="mb-4">
              <label htmlFor="qualification" className="block text-gray-700">
                Qualification
              </label>
              <input
                type="text"
                id="qualification"
                {...register("qualification")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.qualification && (
                <p className="text-red-600">{errors.qualification.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-600">{errors.gender.message}</p>
              )}
            </div>

            {/* Profile Picture */}
            <div className="mb-4">
              <label htmlFor="profile" className="block text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                id="profile"
                accept="image/jpg,image/jpeg,image/png,image/gif"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.profile && (
                <p className="text-red-600">
                  {getFieldErrorMessage(errors.profile)}
                </p>
              )}
              {profilePreview && (
                <div className="relative w-20 h-20 mt-2">
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={removeProfileImage}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
                    aria-label="Remove profile image"
                  >
                    X
                  </button>
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div className="mb-4">
              <label htmlFor="additionalImg" className="block text-gray-700">
                Additional Images (up to 3)
              </label>
              <input
                type="file"
                multiple
                id="additionalImg"
                accept="image/jpg,image/jpeg,image/png,image/gif"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.additionalImg && (
                <p className="text-red-600">
                  {getFieldErrorMessage(errors.additionalImg)}
                </p>
              )}
            </div>

            {/* Additional Images Previews */}
            <div className="flex gap-3 mt-3">
              {previewImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
                    aria-label="Remove image"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {/* Reel */}
            <div className="mb-4">
              <label htmlFor="reel" className="block text-gray-700">
                Short Reel
              </label>
              <input
                type="file"
                id="reel"
                accept="video/mp4,video/ogg,video/webm,video/quicktime"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.reel && (
                <p className="text-red-600">
                  {getFieldErrorMessage(errors.reel)}
                </p>
              )}
              {reelPreview && (
                <div className="relative w-32 h-24 mt-2">
                  <video
                    src={reelPreview}
                    controls
                    className="w-32 h-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={removeReel}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
                    aria-label="Remove reel"
                  >
                    X
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;