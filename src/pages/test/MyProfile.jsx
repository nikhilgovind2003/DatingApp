

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Button from "../../components/buttons/InterestButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MyProfile() {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [sinUser, setSinUser] = useState(null);
  const navigate = useNavigate()

  

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((user) => user.user._id === userId);
      console.log("User found with userId:", userId, "is:", foundUser);

      setSinUser(foundUser || null);
    }
  }, [userId, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/users"
      );
      setUsers(response.data);
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  if (!sinUser) {
    return <div>User not found</div>;
  }

  const handleEdit = () => {
    navigate(`/editprofile/${userId}`)
  }

  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">
        <div
          className="h-[75vh] overflow-hidden sticky top-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url(${sinUser.profileImage.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="topnavigation flex p-2 sticky top-6 justify-between">
            <div className="rounded-full backdrop-filter backdrop-blur-sm bg-opacity-45 border-2 w-fit border-white p-2 text-white">
              <ChevronLeft />
            </div>
            <div className="rounded-full flex border-2 w-fit backdrop-filter backdrop-blur-sm bg-opacity-45 border-white py-2 px-4 text-white cursor-pointer" onClick={handleEdit}>
              <span>Edit</span>
            </div>
          </div>

          <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
            <div className="text-center">
              <span className="text-3xl text-white text-center">
                {sinUser.user?.firstName + " " + sinUser.user?.lastName}
              </span>{" "}
              <br />
              <span className="text-sm text-gray-300">{sinUser.place}</span>
            </div>
            <div className="text-white text-center py-2 mt-6">
              <span className="inline-flex items-center pl-1 bg-[#4b164c] py-2 rounded-full border-2 border-light-purple">
                <span className="p-2 rounded-full border-4 border-light-purple">
                  80%
                </span>
                <span className="px-2">Profile Complete</span>
              </span>
            </div>
          </div>
        </div>

        <div
          className="profiledetails cursor-pointer h-full shadow-md p-4 bg-white rounded-t-3xl relative"
          style={{ marginTop: "-50px", zIndex: "50" }}
        >
          <div
            className="bg-gray-400 rounded-full mx-auto"
            style={{ width: "60px", padding: "2px" }}
          >
            {/* Avatar or Profile Picture */}
          </div>
          <div className="overflow-y-auto pb-8">
            <div>
              <span className="text-gray-600">About</span>
              <p className="font-Roboto font-medium">{sinUser.message}</p>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex gap-2 flex-wrap">
                {/* Interests */}
                {sinUser.interests.map((interest, index) => {
                  console.log("///////////////////", interest);

                  return (
                    <Button key={index} text={interest} selected={false} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
