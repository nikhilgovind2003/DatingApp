import { useEffect, useState } from "react";
import { Userdata } from "../datas/Userdata";
import { ButtonGroup, Sidemenu, StoryView, UserIcon } from "../Components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <section className="lg:w-full md:w-full sm:w-screen pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
      <div className="flex justify-between md:hidden gap-5">
        <Sidemenu />
        <div className="flex gap-3">
          <button className="relative p-2 flex items-center rounded-full border-2 w-16 h-16">
            <Link to="/notification">
              <HiOutlineBell className="w-9 h-9 text-text ms-1" />
            </Link>
            <div className="bg-light-purple border border-primary absolute top-[16.5px] right-[19.5px] rounded-full w-[8px] h-[8px]"></div>
          </button>
          <div className="pt-3">
            <Rightside />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 overflow-x-auto lg:w-full sm:w-screen">
        <button>
          <UserIcon add={"purple"} />
          <p className="mt-0.5 text-[14px]">My Story</p>
        </button>
        {users.map((user, i) => (
          <button key={i}>
            <UserIcon key={user.user._id} story={true} url={user.profileImage.url} />
            <p className="mt-0.5 text-[14px]">{user.user?.firstName}</p>
          </button>
        ))}
      </div>

      <ButtonGroup />

      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {users.map((user, i) => (
          <Link to={`/profile/${user.user._id}`} key={i}>
            <HomeCardComponents
              img={user.profileImage.url}
              name={`${user.user?.firstName} ${user.user?.lastName}`}
              sex={user.gender}
              job={user.qualification}
              age={user.age}
              place={user.place}
              isActive={user.user?.isActive}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
