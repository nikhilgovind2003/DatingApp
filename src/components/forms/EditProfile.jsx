import { API_URL, SOCKET_URL } from "@/apiConfig";
import { toast } from "sonner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { editProfileSchema } from "../../utils/editProfileValidation";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [data, setData] = useState({});
  const [updateData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({});

  const getProfile = async () => {
    const profileDetails = await axios.get(`${API_URL}/users/get-profile`, {
      withCredentials: true,
    });
    setData(profileDetails.data);
  };


  const navigates= useNavigate()

  useEffect(() => {
    getProfile();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "additionalImages") {
      if (files.length > 3) {
        toast("You can upload up to 3 additional images only.");
        e.target.value = "";
        return;
      }
      setData((prevData) => ({
        ...prevData,
        additionalImages: Array.from(files),
      }));
    } else if (name === "reel") {
      setData((prevData) => ({
        ...prevData,
        reel: files[0],
      }));
    } else if (name === "profileImage") {
      setData((prevData) => ({
        ...prevData,
        profileImage: files[0],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "additionalImages") {
      if (files.length > 3) {
        toast("You can upload up to 3 additional images only.");
        e.target.value = "";
        return;
      }
      setUpdatedData((prevData) => ({
        ...prevData,
        additionalImages: Array.from(files),
      }));
    } else if (name === "reel") {
      setUpdatedData((prevData) => ({
        ...prevData,
        reel: files[0],
      }));
    } else if (name === "profileImage") {
      setUpdatedData((prevData) => ({
        ...prevData,
        profileImage: files[0],
      }));
    } else {
      setUpdatedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      firstName: updateData.firstName ?? data?.firstName ?? "",
      lastName: updateData.lastName ?? data?.lastName ?? "",
      email: updateData.email ?? data?.email ?? "",
      contact: updateData.contact ?? data?.contact ?? "",
      age: updateData.age ?? data?.profileDetails?.age ?? "",
      gender: updateData.gender ?? data?.profileDetails?.gender ?? "",
      location: updateData.location ?? data?.profileDetails?.location?.place ?? data?.profileDetails?.location ?? "",
      hobbies: updateData.hobbies ?? data?.profileDetails?.hobbies ?? "",
      interests: updateData.interests ?? (data?.profileDetails?.interests ? (Array.isArray(data?.profileDetails?.interests) ? data.profileDetails.interests.join(", ") : data.profileDetails.interests) : ""),
      drinking: updateData.drinking ?? data?.profileDetails?.drinking ?? "",
      smoking: updateData.smoking ?? data?.profileDetails?.smoking ?? "",
      qualification: updateData.qualification ?? data?.profileDetails?.qualification ?? "",
      bio: updateData.bio ?? data?.profileDetails?.bio ?? "",
    };

    const result = editProfileSchema.safeParse(finalData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      toast("Please fix the validation errors");
      return;
    }
    setErrors({});
    const formData = new FormData();

    Object.keys(finalData).forEach((key) => {
      formData.append(key, finalData[key]);
    });

    if (updateData.additionalImages) {
      updateData.additionalImages
        .slice(0, 3)
        .forEach((file) => formData.append("additionalImg", file));
    }
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
    <div className="flex justify-center   items-center">
      <div className="bg-white  rounded-t-3xl p-4 w-full ">
        <div className="flex justify-center gap-4 items-center">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={updateData?.profileImage instanceof File ? URL.createObjectURL(updateData.profileImage) : (data?.profileDetails?.profileImage?.url || "fallbackImage.jpg")}
              alt="Profile"
            />
            <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white rounded-full w-4 h-4"></span>
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
          onSubmit={handleSubmit}
          className="mt-2 overflow-scroll h-[59vh]"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={updateData?.firstName ?? data?.firstName ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName[0]}</p>}
            </div>
            
            <div className="w-full">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={updateData?.lastName ?? data?.lastName ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName[0]}</p>}
            </div>

            <div className="w-full col-span-2">
              <input
                type="email"
                placeholder="Email"
                name="email"
                disabled={true}
                value={updateData?.email ?? data?.email ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
            </div>

            <div className="w-full col-span-2">
              <input
                type="tel"
                placeholder="Phone Number"
                name="contact"
                value={updateData?.contact ?? data?.contact ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact[0]}</p>}
            </div>
            
            <div className="w-full">
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={updateData?.age ?? data?.profileDetails?.age ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age[0]}</p>}
            </div>

            <div className="w-full">
              <select
                name="gender"
                value={updateData?.gender ?? data?.profileDetails?.gender ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>}
            </div>

            <div className="w-full col-span-2">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={updateData?.location ?? data?.profileDetails?.location?.place ?? data?.profileDetails?.location ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location[0]}</p>}
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Hobbies"
                name="hobbies"
                value={updateData?.hobbies ?? data?.profileDetails?.hobbies ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies[0]}</p>}
            </div>

            <div className="w-full">
              <input
                type="text"
                placeholder="Interests (comma separated)"
                name="interests"
                value={updateData?.interests ?? (data?.profileDetails?.interests ? (Array.isArray(data.profileDetails.interests) ? data.profileDetails.interests.join(", ") : data.profileDetails.interests) : "")}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests[0]}</p>}
            </div>

            <div className="w-full">
              <select
                name="drinking"
                value={updateData?.drinking ?? data?.profileDetails?.drinking ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="Never">Never</option>
                <option value="Regularly">Regularly</option>
                <option value="Quit">Quit</option>
                <option value="Occasionally">Occasionally</option>
              </select>
              {errors.drinking && <p className="text-red-500 text-sm mt-1">{errors.drinking[0]}</p>}
            </div>

            <div className="w-full">
              <select
                name="smoking"
                value={updateData?.smoking ?? data?.profileDetails?.smoking ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="Never">Never</option>
                <option value="Regularly">Regularly</option>
                <option value="Quit">Quit</option>
                <option value="Occasionally">Occasionally</option>
              </select>
              {errors.smoking && <p className="text-red-500 text-sm mt-1">{errors.smoking[0]}</p>}
            </div>

            <div className="w-full col-span-2">
              <input
                type="text"
                placeholder="Qualification"
                name="qualification"
                value={updateData?.qualification ?? data?.profileDetails?.qualification ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification[0]}</p>}
            </div>

            <div className="w-full col-span-2">
              <textarea
                placeholder="Bio"
                name="bio"
                value={updateData?.bio ?? data?.profileDetails?.bio ?? ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
              ></textarea>
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio[0]}</p>}
            </div>
            
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
