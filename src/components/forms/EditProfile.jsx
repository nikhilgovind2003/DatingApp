import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function EditProfile() {
  const [data, setData] = useState({});
  const [updateData, setUpdatedData] = useState({});

  const getProfile = async () => {
    const profileDetails = await axios.get(
      "http://localhost:5000/api/v1/users/get-profile",
      {
        withCredentials: true,
      }
    );
    setData(profileDetails.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "additionalImages") {
      if (files.length > 3) {
        alert("You can upload up to 3 additional images only.");
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
        alert("You can upload up to 3 additional images only.");
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
    alert("Submitted");
    e.preventDefault();
    const formData = new FormData();

    Object.keys(updateData).forEach((key) => {
      if (key === "additionalImages") {
        updateData[key].slice(0, 3).forEach((file) =>
          formData.append("additionalImg", file)
        );
      } else if (key === "reel") {
        if (updateData[key]) formData.append("reel", updateData[key]);
      } else if (key === "profileImage") {
        if (updateData[key]) formData.append("profileImage", updateData[key]);
      } else {
        if (updateData[key]) formData.append(key, updateData[key]);
      }
    });

    try {
      await axios.post(
        "http://localhost:5000/api/v1/users/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      getProfile();
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  console.log({ updateData });

  return (
    <div className="flex justify-center   items-center">
      <div className="bg-white  rounded-t-3xl p-4 w-full ">
        <div className="flex justify-center gap-4 items-center">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src={data?.profileDetails?.profileImage?.url}
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
          className="mt-2 space-y-4 overflow-scroll h-[59vh]"
        >
          <input
            type="text"
            placeholder="FirstName"
            name="firstName"
            value={
              updateData?.firstName != null
                ? updateData.firstName
                : data.firstName
            }
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="LastName"
            name="lastName"
            value={
              updateData?.lastName != null ? updateData.lastName : data.lastName
            }
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={updateData?.email != null ? updateData.email : data.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="contact"
            value={
              updateData?.contact != null ? updateData.contact : data.contact
            }
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Bio"
            name="bio"
            value={
              updateData?.bio != null
                ? updateData.bio
                : data.profileDetails?.bio
            }
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="3"
          ></textarea>
          <label htmlFor="profileImage">
            Profile Image
            <input
              type="file"
              name="profileImage"
              id="profileImage"
              title=""
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </label>
          <label htmlFor="AdditionalImages"> Additional images (up to 3) <input
            type="file"
            name="additionalImages"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          /></label>

          <label htmlFor="reel">Reel
            <input
              type="file"
              name="reel"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </label>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {data?.profileDetails?.additionalImage?.map((img) => {
                return (
                  <img
                    key={img._id}
                    className="w-10 h-10 rounded-full object-cover "
                    src={img?.url}
                    alt="Image1"
                  />
                );
              })}
              <button type="button" className="flex justify-center items-center w-10 h-10 border border-dashed border-gray-400 rounded-full text-gray-400">
                +
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <video className="w-10 h-10 rounded-full object-cover"
                src={data?.profileDetails?.reel?.url}
                autoPlay
                controls
              ></video>
              <button type="button" className="flex justify-center items-center w-10 h-10 border border-dashed border-gray-400 rounded-full text-gray-400">
                +
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-deep-plum text-white py-2 rounded-full hover:bg-purple-900 transition duration-200"
          >
            Update
          </button>
        </form>



      </div>
    </div>
  );
}

export default EditProfile;
