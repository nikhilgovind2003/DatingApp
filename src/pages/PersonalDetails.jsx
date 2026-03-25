import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from 'sonner';

import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// shadcn components
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

// ─── Styled form input (shadcn-style) ─────────────────────────────────────────
const inputClasses =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

const selectClasses =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

const fileInputClasses =
  "flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

// ─── Component ────────────────────────────────────────────────────────────────
const PersonalDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("bio", data.bio || "");
      formData.append("age", data.age || "");
      formData.append("location", data.location || "");
      formData.append("hobbies", data.hobbies || "");
      formData.append("interests", data.interests || "");
      formData.append("smoking", data.smoking || "");
      formData.append("drinking", data.drinking || "");
      formData.append("qualification", data.qualification || "");
      formData.append("gender", data.gender || "");

      if (!data.profile || data.profile.length === 0) {
        setLoading(false);
        return toast.error("Please upload a profile picture.");
      }
      // if (!data.additionalImg || data.additionalImg.length !== 3) {
      //   setLoading(false);
      //   return toast.error("Please upload exactly 3 additional images.");
      // }
      if (!data.reel || data.reel.length === 0) {
        setLoading(false);
        return toast.error("Please upload a short reel.");
      }

      // Robust file handling for profile
      if (data.profile && data.profile.length > 0) {
        formData.append("profile", data.profile[0]);
      }

      // Robust file handling for additional images
      if (data.additionalImg && data.additionalImg.length === 3) {
        data.additionalImg.forEach((img) => {
          formData.append("additionalImg", img);
        });
      }

      // Robust file handling for reel
      if (data.reel && data.reel.length > 0) {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10" />
      
      <div className="flex flex-col min-h-screen p-4 lg:w-2/5 z-0">
        <div className="bg-white/70 backdrop-blur-md border border-white/40 p-8 mt-14 mb-10 rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <h2 className="mb-8 text-3xl font-extrabold text-center text-deep-plum tracking-tight">
            Personal Details
          </h2>
          <form onSubmit={handleSubmit(onSubmit, (error) => console.log("error mesage: ",error))} className="space-y-6">

            {/* Bio */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <FormLabel htmlFor="bio">
                Bio
              </FormLabel>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself (min 20 characters)"
                className="bg-white/50 backdrop-blur-sm focus:bg-white transition-all min-h-[100px]"
                {...register("bio")}
              />
            </FormItem>

            {/* Age & Gender Row */}
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
              <FormItem>
                <FormLabel htmlFor="age">
                  Age
                </FormLabel>
                <input
                  type="number"
                  id="age"
                  placeholder="18+"
                  className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                  {...register("age")}
                />
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="gender">
                  Gender
                </FormLabel>
                <select
                  id="gender"
                  className={cn(selectClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all appearance-none")}
                  {...register("gender")}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </FormItem>
            </div>

            {/* Location */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <FormLabel htmlFor="location">
                Location
              </FormLabel>
              <input
                type="text"
                id="location"
                placeholder="Where do you live?"
                className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                {...register("location")}
              />
            </FormItem>

            {/* Hobbies & Interests */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <FormItem>
                <FormLabel htmlFor="hobbies">
                  Hobbies
                </FormLabel>
                <input
                  type="text"
                  id="hobbies"
                  placeholder="Hiking, Reading, Cooking..."
                  className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                  {...register("hobbies")}
                />
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="interests">
                  Interests
                </FormLabel>
                <input
                  type="text"
                  id="interests"
                  placeholder="Music, Tech, Travel..."
                  className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                  {...register("interests")}
                />
              </FormItem>
            </div>

            {/* Habits Row */}
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-800">
              <FormItem>
                <FormLabel htmlFor="smoking">
                  Smoking
                </FormLabel>
                <select
                  id="smoking"
                  className={cn(selectClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all appearance-none")}
                  {...register("smoking")}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Regularly">Regularly</option>
                  <option value="Quit">Quit</option>
                </select>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="drinking">
                  Drinking
                </FormLabel>
                <select
                  id="drinking"
                  className={cn(selectClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all appearance-none")}
                  {...register("drinking")}
                >
                  <option value="">Select</option>
                  <option value="Never">Never</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Regularly">Regularly</option>
                </select>
              </FormItem>
            </div>

            {/* Qualification */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <FormLabel htmlFor="qualification">
                Qualification
              </FormLabel>
              <input
                type="text"
                id="qualification"
                placeholder="Your education level"
                className={cn(inputClasses, "bg-white/50 backdrop-blur-sm focus:bg-white transition-all")}
                {...register("qualification")}
              />
            </FormItem>

            <hr className="border-gray-300/50" />

            {/* Profile Picture */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <FormLabel className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-deep-plum animate-pulse" />
                Profile Picture
              </FormLabel>
              <div className="group relative">
                <Controller
                  name="profile"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="profile"
                      accept="image/jpg,image/jpeg,image/png,image/gif"
                      className={cn(fileInputClasses, "bg-white/30 hover:bg-white/50 transition-colors")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file ? [file] : []);
                      }}
                    />
                  )}
                />
              </div>
            </FormItem>

            {/* Additional Images */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <FormLabel className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Additional Images</span>
                </div>
              </FormLabel>
              <FormDescription>Upload up to 3 high-quality photos.</FormDescription>
              <Controller
                name="additionalImg"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    multiple
                    id="additionalImg"
                    accept="image/jpg,image/jpeg,image/png,image/gif"
                    className={cn(fileInputClasses, "bg-white/30 hover:bg-white/50 transition-colors")}
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      if (files.length > 0 && files.length !== 3) {
                        toast.error("Please upload exactly 3 additional images.");
                      }
                      field.onChange(files.length ? files : []);
                    }}
                  />
                )}
              />
            </FormItem>

            {/* Reel */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-1000">
              <FormLabel className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Short Reel
              </FormLabel>
              <Controller
                name="reel"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    id="reel"
                    accept="video/mp4,video/ogg,video/webm,video/quicktime"
                    className={cn(fileInputClasses, "bg-white/30 hover:bg-white/50 transition-colors")}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file ? [file] : []);
                    }}
                  />
                )}
              />
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