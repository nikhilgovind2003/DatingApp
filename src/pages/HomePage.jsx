import { API_URL } from "@/apiConfig";
import { useEffect, useRef, useState } from "react";
import Sidemenu from "../components/SideMenu/Sidemenu";
import StoryView from "../components/StoryView/storyView";
import ButtonGroup from "../components/buttons/HomeButtonGroup";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const locationSent = useRef(false);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/userdetails`,
          { withCredentials: true }
        ); // Fetch all users from your backend
        const activeUsers = response.data.filter((user) => user?.user?.isActive); // Filter users where isActive is true
        setUsers(activeUsers); // Store filtered users in state

      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    // Get current location
    const getLocation = async () => {
      if (locationSent.current) return;
      else {
        if (navigator.geolocation) {
          try {
            //  Fetch the location using navigator.geolocation
            const position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            console.log("Location fetched successfully:", {
              latitude,
              longitude,
            });

            // Send the location after it has been fetched
            await sendLocation(latitude, longitude);
            locationSent.current = true; // Mark that the location has been fetched and sent
            console.log("Location sent successfully");
          } catch (error) {
            setError(error.message); // Handle any errors during fetching or sending location
            console.error("Error fetching or sending location:", error);
          }
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      }
    }

    fetchUsers();
    getLocation();

  }, [dispatch]);

  const sendLocation = async (latitude, longitude) => {
    try {
      await axios.post(`${API_URL}/users/getlocation`, { latitude, longitude }, { withCredentials: true });
    } catch (error) {
      console.error("error sending location", error)
    }
  }


  return (
    <section className=" sm: w-screen md:w-full lg:w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
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
          <HomeCardComponents
            key={user.user?._id || i}
            img={user.profileImage?.url}
            name={user.user ? `${user.user.firstName} ${user.user.lastName}` : "Unknown User"}
            userId={user.user?._id}  // Pass userId as prop
            gender={user.gender}
            job={user.qualification}
            age={user.age}
            place={user.place}
            isActive={user.user?.isActive}
          />
        ))}
      </div>

    </section>
  );
};

export default HomePage;



