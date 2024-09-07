import { useEffect, useState } from "react";
import { ButtonGroup, Sidemenu, StoryView, UserIcon } from "../Components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";
import Cookies from "js-cookie";
import { login, logout } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userAuth);
  console.log(userInfo);

  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to check cookie and dispatch login or logout
    const handleAuthentication = () => {
      const userCookie = Cookies.get('user');
      const token = Cookies.get('token');

      if (userCookie && token) {
        try {
          const decodedUserCookie = decodeURIComponent(userCookie);
          const cleanedUserJson = decodedUserCookie.startsWith('j:')
            ? decodedUserCookie.slice(2)
            : decodedUserCookie;
          const user = JSON.parse(cleanedUserJson);
          console.log(user);

          // Dispatch login action with user and token
          const payload = {
            userInfo: user._doc,
            isAuthenticated: user.isAuthenticated,
            token,
          };
          dispatch(login(payload));
        } catch (error) {
          console.error("Error parsing user data or dispatching login:", error);
          dispatch(logout()); // Log out if there's an issue parsing data
        }
      } else {
        dispatch(logout()); // Log out if cookies are not present
      }
    };

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/userdetails",
          { withCredentials: true }
        ); // Fetch all users from your backend
        const activeUsers = response.data.filter((user) => user.user.isActive); // Filter users where isActive is true
        setUsers(activeUsers); // Store filtered users in state
        console.log("Fetched Active Users:", activeUsers);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    // Get current location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchUsers();
    handleAuthentication();
    getLocation();
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
              gender={user.gender}
              job={user.qualification}
              age={user.age}
              place={user.place}
              isActive={user.user?.isActive}
            />
          </Link>
        ))}
      </div>
      {/* {location.lat && location.lng ? (
        <p>Your location: Latitude: {location.lat}, Longitude: {location.lng}</p>
      ) : error ? (
        <p>Error getting location: {error}</p>
      ) : (
        <p>Fetching location...</p>
      )} */}
    </section>
  );
};

export default HomePage;
