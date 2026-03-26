import { useEffect, useRef, useState } from "react";
import { ButtonGroup, Sidemenu, StoryView, UserIcon } from "../components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";
import Cookies from "js-cookie";
import { login, logout } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../App"


const HomePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userAuth);
  console.log(userInfo);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const locationSent = useRef(false)

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
    handleAuthentication();
    getLocation();

    // Emit 'joinRoom' when the socket connects
    console.log(`id: ${JSON.stringify(userInfo)}`)
    console.log(`id: ${userInfo.userInfo._id}`)
    socket.on('connect', () => {
      socket.emit('joinRoom', userInfo.userInfo._id);
      console.log(`User joined room with ID: ${userInfo.userInfo._id}`);
    });

    // Optionally handle disconnection/reconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from the socket server');
    });

    // return () => {
    //   socket.disconnect(); // Clean up when the component unmounts
    // };


  }, [dispatch]);

  const sendLocation = async (latitude, longitude) => {
    try {
      await axios.post("http://localhost:5000/api/v1/users/getlocation", { latitude, longitude }, { withCredentials: true });
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
            key={i}
            img={user.profileImage.url}
            name={`${user.user?.firstName} ${user.user?.lastName}`}
            userId={user.user._id}  // Pass userId as prop
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
