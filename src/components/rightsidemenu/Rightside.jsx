import { SOCKET_URL } from "@/apiConfig";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,

} from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { FaCrown } from "react-icons/fa";
import { MdInput } from "react-icons/md";
import { navData } from "../../datas/navData";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { UserIcon } from "..";
import { logout } from "../../redux/features/auth/authSlice";
import useMyProfile from "../../hooks/useMyProfile";
import { toast } from "sonner";

const Rightside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userAuth.userInfo);
  const myProfile = useMyProfile() || {
    _id: null,
    profileImage: { url: null },
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const scrollRef = useRef(null);
  const [scrolledTop, setScrolledTop] = useState(false);
  const [scrolledBottom, setScrolledBottom] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setScrolledTop(scrollTop > 0);
    const atBottom = scrollHeight - scrollTop - clientHeight <= 1;
    setScrolledBottom(!atBottom && scrollHeight > clientHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${SOCKET_URL}/logout`, null, {
        withCredentials: true,
      });
      dispatch(logout());
      setIsOpen(false);
      setTimeout(() => {
        toast.success(res.data.message);
      }, 1000);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  console.log("userInfo", userInfo);

  return (
    <div>
      <Button
        variant={"none"}
        className="flex items-center gap-2"
        onClick={toggleDropdown}
      >
        <UserIcon url={myProfile?.profileImage?.url} />
      </Button>

      <Drawer placement={"right"} isOpen={isOpen} onClose={!isOpen}>
        <DrawerOverlay />
        <DrawerContent className="h-fit">
          <DrawerBody className="bg-deep-plum bg-opacity-100 backdrop-filter backdrop-blur-lg border border-white border-opacity-10 w-[20rem] rounded-sm">
            <CiCircleRemove
              className="size-7 text-white mb-2 ml-[15rem] mt-2"
              onClick={toggleDropdown}
            />
            <div className="flex items-center ml-3 mb-[30px]">
              <div className="relative border-[3px] border-light-purple rounded-full">
                <img
                  src={myProfile?.profileImage?.url ?? "image/profiles.jpeg"}
                  className="rounded-full w-12 h-12 object-cover"
                />
                <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-hot-purple"></span>
              </div>
              <div className="text-center mt-3 ml-3">
                <h2 className="font-bold text-lg text-light-purple">
                  {userInfo?.firstName + " " + userInfo?.lastName ||
                    "User Name"}
                </h2>

                {userInfo?.isPrime && (
                  <div className="text-sm text-yellow-300">
                    <div className="flex flex-row">
                      <FaCrown className="m-[.2rem]" />
                      {!userInfo?.isPrime ? "Prime User" : ""}
                    </div>
                  </div>
                )}

                {userInfo?.isActive && (
                  <p className="text-sm text-green-600 text-center ml-2">
                    Online
                  </p>
                )}
              </div>
            </div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-y-auto py-5 relative"
              style={{
                height: "450px",
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
              <ul className="space-y-2 text-white">
                {navData?.map((item) => (
                  <Link to={item.href} key={item.title}>
                    <li className="hover:bg-dark-wine px-4 py-2 transition-all ease-in-out duration-150 rounded-md">
                      {item.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex flex-row ml-7 mb-4">
              <Button variant={"none"} onClick={handleLogout} className="text-center w-full hover:bg-dark-wine">
                <MdInput className="size-5 text-white -rotate-180 ..." />
                <h3 className="text-white ml-4">Logout</h3>
              </Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Rightside;
