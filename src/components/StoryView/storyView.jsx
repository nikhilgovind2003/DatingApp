import { API_URL } from "@/apiConfig";
import { useEffect, useState } from "react";
import UserIcon from "../usericons/UserIcon";
import axios from "axios";
import { Link } from "react-router-dom";
import useMyProfile from "../../hooks/useMyProfile";

const StoryView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const myProfile = useMyProfile() || { _id: null, user: null };



  const viewedStories = JSON.parse(localStorage.getItem("viewed-stories") || "[]");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/users`,
          { withCredentials: true }
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      {loading ? (
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
          <Link to={`/story/${myProfile?._id}`}>
            <button>
              <UserIcon 
                story={true} 
                url={myProfile?.profileImage?.url} 
                viewed={myProfile?._id ? viewedStories.includes(myProfile._id) : false} 
              />
              <p className="mt-0.5 text-[14px]">My Story</p>
            </button>
          </Link>

          {users
            .filter(user => myProfile?.user !== user.user?._id)
            .map((user, i) => (
              <Link key={i} to={`/story/${user._id}`}>
                <button className="flex flex-col items-center">
                  <UserIcon 
                    story={true} 
                    url={user.profileImage?.url} 
                    viewed={viewedStories.includes(user._id)} 
                  />
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
