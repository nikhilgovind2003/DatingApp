import { useEffect, useState } from "react";
import { UserIcon } from "../index";
// import { config } from "dotenv";
import axios from "axios";
import { Link } from "react-router-dom";
import { Userdata } from "../../datas/Userdata";
// import { config } from "dotenv";

const StoryView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/users"
        ); // Fetch all users from your backend
        setUsers(response.data); // Store fetched users in state
        console.log("Fetched Data:", response.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // console.log(users);

  





  return (
    <div className=" flex gap-4">
        <button>
          <UserIcon />
          <p className="mt-0.5 text-[14px]">My Story</p>
        </button>
        {users.map((user, i) => (
         <Link key={i} to={`/story/${user._id}`}>
          <button>
            <UserIcon key={user.user._id} story={true} url={user.profileImage.url} />
            <p className="mt-0.5 text-[14px]">{user.user?.firstName}</p>
          </button>
         </Link>
        ))}
    </div>
  );
};

export default StoryView;