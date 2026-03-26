import { API_URL, SOCKET_URL } from "@/apiConfig";
import { useEffect, useState } from "react";
import { UserIcon } from "../index"; // Importing UserIcon component
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const StoryView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for wireframe

  const myProfileCookie = Cookies.get('myProfile');
  const decodedMyProfileCookie = decodeURIComponent(myProfileCookie);
  const cleanedMyProfileJson = decodedMyProfileCookie.startsWith('j:') ? decodedMyProfileCookie.slice(2) : decodedMyProfileCookie;
  const myProfile = JSON.parse(cleanedMyProfileJson);
  console.log(myProfile);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/users`); // Fetch all users from your backend
        setUsers(response.data); // Store fetched users in state
        console.log("Fetched Data:", response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.log("Error fetching users:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      {loading ? (
        // Wireframe skeleton for the loading state
        <>
          <div className="animate-pulse">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
            <div className="w-[50px] h-[14px] bg-gray-300 mt-1 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
            <div className="w-[50px] h-[14px] bg-gray-300 mt-1 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
            <div className="w-[50px] h-[14px] bg-gray-300 mt-1 rounded"></div>
          </div>
        </>
      ) : (
        <>
          {/* My Story */}
          <Link to={`/story/${myProfile._id}`}>
            <button>
              <UserIcon story={true} url={myProfile?.profileImage?.url} />
              <p className="mt-0.5 text-[14px]">My Story</p>
            </button>
          </Link>

          {/* Other Users' Stories */}
          {users
            .filter(user => myProfile.user !== user.user._id) // Filter out the current user's story
            .map((user, i) => (
              <Link key={i} to={`/story/${user._id}`}>
                <button className="flex flex-col items-center">
                  <UserIcon story={true} url={user.profileImage.url} />
                  <p className="mt-0.5 text-[14px]">{user.user?.firstName}</p>
                </button>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default StoryView;



