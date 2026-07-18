import { API_URL, SOCKET_URL } from "@/apiConfig";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { navData } from "../../datas/navData";
import { MdInput } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { logout } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { useSocket } from "@/context/SocketContext";
import useMyProfile from "../../hooks/useMyProfile";

const RightBar = () => {
  const [unreadCount, setUnreadCount] = useState(0); // For storing the number of unread notifications
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);

  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setScrolledTop(scrollTop > 0);
    const atBottom = scrollHeight - scrollTop - clientHeight <= 1;
    setScrolledBottom(!atBottom && scrollHeight > clientHeight);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state?.userAuth);
  const myProfileFromCookie = useMyProfile() || {
    _id: null,
    profileImage: { url: null },
  };

  const { socket } = useSocket();

  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/notifications`, {
        withCredentials: true,
      });
      // Notifications controller already filters by isRead: false if needed,
      // but let's be sure or just count what we get.
      setUnreadCount(res.data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    if (socket) {
      socket.on("newNotification", () => {
        fetchUnreadCount();
      });

      socket.on("notificationRead", () => {
        fetchUnreadCount();
      });

      return () => {
        socket.off("newNotification");
        socket.off("notificationRead");
      };
    }
  }, [socket]);

  const handleLogout = async () => {
    try {
      await axios.post(`${SOCKET_URL}/logout`, null, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const isPrime = useSelector((state) =>
    state.userAuth.userInfo?.isPrime ? true : false,
  );

  return (
    <div className="w-full h-screen bg-hot-purple text-white text-lg sm:text-sm md:text-sm lg:text-lg pt-2">
      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row items-center gap-2 justify-evenly my-[30px]">
        <div className="flex flex-col lg:flex-row lg:gap-4 items-center">
          <div className="relative">
            {/* Profile Picture */}

            {myProfileFromCookie?.profileImage?.url ? (
              <img
                src={myProfileFromCookie?.profileImage?.url} // Replace with the actual profile picture URL
                alt="Profile"
                className="rounded-full w-12 h-12 object-cover"
              />
            ) : (
              <FaUserCircle className="rounded-full w-12 h-12 object-cover" />
            )}
            {/* Online Indicator */}
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-hot-purple"></span>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-lg">
              {userInfo?.firstName + " " + userInfo?.lastName || "User Name"}
            </h2>
            {isPrime && <p className="text-sm text-green-300">Prime Member</p>}
            <p className="text-sm text-green-300">Online</p>
          </div>
        </div>

        <div className="relative">
          <Link to="/notification">
            <Bell fill="white" />
            {unreadCount > 0 && (
              <div className="absolute top-[-10px] right-[-10px] w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                {unreadCount}
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <div
        ref={scrollRef}
        className="overflow-y-auto py-5"
        onScroll={handleScroll}
        style={{
          height: "550px",
          WebkitMaskImage:
            scrolledTop || scrolledBottom
              ? "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)"
              : "none",
          maskImage:
            scrolledTop || scrolledBottom
              ? "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)"
              : "none",
        }}
      >
        <ul className="space-y-2">
          {navData?.map((item) => (
            <Link to={item.href} key={item.title}>
              <li className="hover:bg-dark-wine px-4 py-2">{item.title}</li>
            </Link>
          ))}
        </ul>
        <div className="hover:bg-dark-wine">
          <Button variant={"none"} onClick={handleLogout}>
            <MdInput className="text-lg text-white -rotate-180 ..." />
            <h3 className="text-white ml-4">Logout</h3>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
