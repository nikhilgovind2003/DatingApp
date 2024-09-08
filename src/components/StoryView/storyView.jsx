import { useEffect, useState } from "react";
import { UserIcon } from "../index"; // Importing UserIcon component
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const StoryView = () => {
  const [users, setUsers] = useState([]);

  const myProfileCookie = Cookies.get('myProfile');
  const decodedMyProfileCookie = decodeURIComponent(myProfileCookie);
  const cleanedMyProfileJson = decodedMyProfileCookie.startsWith('j:') ? decodedMyProfileCookie.slice(2) : decodedMyProfileCookie;
  const myProfile = JSON.parse(cleanedMyProfileJson);
  console.log(myProfile);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/users"); // Fetch all users from your backend
        setUsers(response.data); // Store fetched users in state
        console.log("Fetched Data:", response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex gap-4 items-center ">
      <button>
        <UserIcon url={myProfile?.profileImage?.url} />
        <p className="mt-0.5 text-[14px]">My Story</p>
      </button>
      {users
        .filter(user => myProfile.user !== user._id) // Filter out the current user's story
        .map((user, i) => (
          <Link key={user._id} to={`/story/${user._id}`}>
            <button className="flex flex-col items-center">
              <UserIcon story={true} url={user.profileImage.url} />
              <p className="mt-0.5 text-[14px]">{user.user?.firstName}</p>
            </button>
          </Link>
        ))}
    </div>
  );
};

export default StoryView;