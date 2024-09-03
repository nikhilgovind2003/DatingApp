import { useEffect, useState } from "react";
import { Userdata } from "../datas/Userdata";
import { ButtonGroup, Sidemenu, StoryView, UserIcon } from "../Components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";
import Cookies from "js-cookie";
import { login, logout } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to check cookie and dispatch login or logout
    const handleAuthentication = () => {
      const userCookie = Cookies.get('user');
      const token = Cookies.get('token');

      if (userCookie && token) {
        try {
          const decodedUserCookie = decodeURIComponent(userCookie);
          const cleanedUserJson = decodedUserCookie.startsWith('j:') ? decodedUserCookie.slice(2) : decodedUserCookie;
          const user = JSON.parse(cleanedUserJson);
          
          // Dispatch login action with user and token
          const payload = {
            userInfo: user._doc,
            isAuthenticated: user.isAuthenticated,
            token
          };
          dispatch(login(payload));
        } catch (error) {
          console.error('Error parsing user data or dispatching login:', error);
          dispatch(logout()); // Log out if there's an issue parsing data
        }
      } else {
        dispatch(logout()); // Log out if cookies are not present
      }
    };
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
    handleAuthentication();
  }, [dispatch]);



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
    <StoryView />
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