import { API_URL } from "@/apiConfig";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../../utils/editProfileValidation";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function EditProfile() {
  const [data, setData] = useState({});
  const [updateData, setUpdatedData] = useState({});
  // const [errors, setErrors] = useState({});

  const getProfile = async () => {
    const profileDetails = await axios.get(`${API_URL}/users/get-profile`, {
      withCredentials: true,
    });
    const profile = profileDetails.data;
    setData(profile);

    const profileInfo = profile.profileDetails || {};
    reset({
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      email: profile.email ?? "",
      contact: profile.contact ?? "",
      age: profileInfo.age ?? "",
      gender: profileInfo.gender ?? "",
      location: profileInfo.location?.place ?? profileInfo.location ?? "",
      hobbies: profileInfo.hobbies ?? "",
      interests: Array.isArray(profileInfo.interests)
        ? profileInfo.interests.join(", ")
        : profileInfo.interests ?? "",
      drinking: profileInfo.drinking ?? "",
      smoking: profileInfo.smoking ?? "",
      qualification: profileInfo.qualification ?? "",
      bio: profileInfo.bio ?? "",
      profileImage: null,
      reel: null,
      additionalImages: [],
    });
  };

const {
  register,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
} = useForm({
  resolver: zodResolver(editProfileSchema),
  mode: "onChange",          // validate when user leaves a field
  reValidateMode: "onChange", // then re-validate live as they fix it
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    location: "",
    hobbies: "",
    interests: "",
    drinking: "",
    smoking: "",
    qualification: "",
    bio: "",
    profileImage: null,
    reel: null,
    additionalImages: [],
  },
});

  const navigates= useNavigate()

  useEffect(() => {
    getProfile();
  }, []);



    const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (!files) return;

    if (name === "additionalImages") {
      if (files.length > 3) {
        toast("You can upload up to 3 additional images only.");
        e.target.value = "";
        return;
      }

      const fileArray = Array.from(files);
      setUpdatedData((prevData) => ({
        ...prevData,
        additionalImages: fileArray,
      }));
      setValue(name, files, { shouldValidate: true });
      return;
    }

    const file = files[0];
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
    setValue(name, files, { shouldValidate: true });
  };




  const onSubmit = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "profileImage" || key === "reel" || key === "additionalImages") return;
      formData.append(key, value);
    });

    updateData.additionalImages?.slice(0, 3).forEach((file) => formData.append("additionalImg", file));
    if (updateData.reel) {
      formData.append("reel", updateData.reel);
    }
    if (updateData.profileImage) {
      formData.append("profileImage", updateData.profileImage);
    }

    try {
      await axios.post(`${API_URL}/users/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      getProfile();
      toast.success("Profile updated successfully");
      navigates("/profile")
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
        
      } else {
        toast.error("Failed to update profile");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-t-3xl p-4 w-full h-full overflow-scroll">
        <div className="flex justify-center flex-col gap-4 items-center">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={updateData?.profileImage instanceof File ? URL.createObjectURL(updateData.profileImage) : (data?.profileDetails?.profileImage?.url || "fallbackImage.jpg")}
              alt="Profile"
            />
            <span className="absolute bottom-[5px] right-[5px] bg-green-500 border-2 border-white rounded-full w-4 h-4"></span>
          </div>
          <div>
            <h2 className="text-xl font-semibold mt-">{data.firstName}</h2>
            <p className="text-gray-500"></p>
          </div>
        </div>
        <p className="mt-2 text-gray-700 text-sm text-center">
          All your account information can be accessed and edited here but your
          mail will still remain un-edited.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 h-[59vh]"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormItem className="w-full">
              <FormLabel htmlFor="firstName" error={!!errors.firstName}>
                First Name
              </FormLabel>
              <Input
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
              />
              <FormMessage>{errors.firstName?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="lastName" error={!!errors.lastName}>
                Last Name
              </FormLabel>
              <Input
                id="lastName"
                placeholder="Last Name"
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
              />
              <FormMessage>{errors.lastName?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full col-span-2">
              <FormLabel htmlFor="email" error={!!errors.email}>
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                readOnly
                {...register("email")}
                aria-invalid={!!errors.email}
                className="cursor-not-allowed"
              />
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full col-span-2">
              <FormLabel htmlFor="contact" error={!!errors.contact}>
                Phone Number
              </FormLabel>
              <Input
                id="contact"
                type="tel"
                placeholder="Phone Number"
                {...register("contact")}
                aria-invalid={!!errors.contact}
              />
              <FormMessage>{errors.contact?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="age" error={!!errors.age}>
                Age
              </FormLabel>
              <Input
                id="age"
                type="number"
                placeholder="Age"
                {...register("age")}
                aria-invalid={!!errors.age}
              />
              <FormMessage>{errors.age?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="gender" error={!!errors.gender}>
                Gender
              </FormLabel>
              <select
                id="gender"
                {...register("gender")}
                aria-invalid={!!errors.gender}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <FormMessage>{errors.gender?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full col-span-2">
              <FormLabel htmlFor="location" error={!!errors.location}>
                Location
              </FormLabel>
              <Input
                id="location"
                placeholder="Location"
                {...register("location")}
                aria-invalid={!!errors.location}
              />
              <FormMessage>{errors.location?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="hobbies" error={!!errors.hobbies}>
                Hobbies
              </FormLabel>
              <Input
                id="hobbies"
                placeholder="Hobbies"
                {...register("hobbies")}
                aria-invalid={!!errors.hobbies}
              />
              <FormMessage>{errors.hobbies?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="interests" error={!!errors.interests}>
                Interests (comma separated)
              </FormLabel>
              <Input
                id="interests"
                placeholder="Interests (comma separated)"
                {...register("interests")}
                aria-invalid={!!errors.interests}
              />
              <FormMessage>{errors.interests?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="drinking" error={!!errors.drinking}>
                Drinking
              </FormLabel>
              <select
                id="drinking"
                {...register("drinking")}
                aria-invalid={!!errors.drinking}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select drinking habit</option>
                <option value="Never">Never</option>
                <option value="Regularly">Regularly</option>
                <option value="Quit">Quit</option>
                <option value="Occasionally">Occasionally</option>
              </select>
              <FormMessage>{errors.drinking?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full">
              <FormLabel htmlFor="smoking" error={!!errors.smoking}>
                Smoking
              </FormLabel>
              <select
                id="smoking"
                {...register("smoking")}
                aria-invalid={!!errors.smoking}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select smoking habit</option>
                <option value="Never">Never</option>
                <option value="Regularly">Regularly</option>
                <option value="Quit">Quit</option>
                <option value="Occasionally">Occasionally</option>
              </select>
              <FormMessage>{errors.smoking?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full col-span-2">
              <FormLabel htmlFor="qualification" error={!!errors.qualification}>
                Qualification
              </FormLabel>
              <Input
                id="qualification"
                placeholder="Qualification"
                {...register("qualification")}
                aria-invalid={!!errors.qualification}
              />
              <FormMessage>{errors.qualification?.message}</FormMessage>
            </FormItem>

            <FormItem className="w-full col-span-2">
              <FormLabel htmlFor="bio" error={!!errors.bio}>
                Bio
              </FormLabel>
              <Textarea
                id="bio"
                placeholder="Bio"
                rows={3}
                {...register("bio")}
                aria-invalid={!!errors.bio}
              />
              <FormMessage>{errors.bio?.message}</FormMessage>
            </FormItem>
            
            <div className="col-span-2">
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg flex-1 bg-white"
                />
                {(updateData?.profileImage || data?.profileDetails?.profileImage?.url) && (
                  <img 
                    src={updateData?.profileImage instanceof File ? URL.createObjectURL(updateData.profileImage) : data?.profileDetails?.profileImage?.url} 
                    alt="Profile Preview" 
                    className="w-12 h-12 rounded-full object-cover border" 
                  />
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="reel" className="block text-sm font-medium text-gray-700 mb-1">
                Reel
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  name="reel"
                  id="reel"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg flex-1 bg-white"
                />
                {(updateData?.reel || data?.profileDetails?.reel?.url) && (
                  <video 
                    src={updateData?.reel instanceof File ? URL.createObjectURL(updateData.reel) : data?.profileDetails?.reel?.url} 
                    className="w-12 h-12 rounded-full object-cover border" 
                    muted
                  />
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-700 mb-1">
                Additional images (up to 3)
              </label>
              <input
                type="file"
                name="additionalImages"
                id="additionalImages"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              />
              <div className="flex mt-2 gap-2">
                {updateData?.additionalImages ? (
                  updateData.additionalImages.map((file, idx) => (
                    <img key={idx} src={URL.createObjectURL(file)} alt="Additional" className="w-12 h-12 rounded-lg object-cover border" />
                  ))
                ) : (
                  data?.profileDetails?.additionalImage?.map((img) => (
                    <img key={img._id} src={img?.url} alt="Additional" className="w-12 h-12 rounded-lg object-cover border" />
                  ))
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-deep-plum text-white py-2 mt-6 rounded-full hover:bg-purple-900 transition duration-200 mb-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
