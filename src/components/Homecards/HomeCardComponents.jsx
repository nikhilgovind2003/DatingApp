import { API_URL } from "@/apiConfig";
import { toast } from 'sonner';
import { Heart, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSocket } from "@/context/SocketContext";

const HomeCardComponents = (props) => {
  const { isOnline } = useSocket();
  const online = isOnline(props.userId);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time before showing the actual content
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleSendRequest = async () => {
    try {
      await axios.patch(`${API_URL}/users/send/${props.userId}`, { }, { withCredentials: true });
      toast('Friend request sent!');
      console.log(props.userId);
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  };

  const handleShortlistRequest = async () => {
    try {
      await axios.post(`${API_URL}/users/shortlist/${props.userId}`, { }, { withCredentials: true });
      toast('Shortlisted!');
      console.log(props.userId);
    } catch (error) {
      console.error('Error shortlisting', error);
    }
  };

  return (
    <>
      {props.isActive && (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundImage: loading ? 'none' : `url("${props.img}")`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
          }}
          className={`w-full h-[120px] rounded-2xl relative ${loading ? 'animate-pulse bg-gray-300' : ''}`}  // Pulse wireframe
        >
          {loading ? (
            <div className="h-full w-full bg-gray-200 rounded-2xl"></div> // Wireframe placeholder
          ) : (
            <>
              {online && (
                <div className="bg-gray-500 bg-opacity-[20%] text-white backdrop-blur-lg top-2 left-4 absolute text-[10px] px-2 py-0.5 flex items-center gap-1 rounded-full border border-white/20 shadow-sm transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <p className="font-medium tracking-wide">Online</p>
                </div>
              )}

              {/* Only the name is clickable */}
              <Link to={`/profile/${props.userId}`}>
                <div className="flex flex-col justify-center w-full absolute bottom-[5%] text-primary text-shadow-xl text-[12px] px-4">
                  <div className="flex justify-between items-center">
                    <p className="">{props.name}</p>
                    <p className="text-[7px] tracking-[0.25em]">
                      {props.gender} {props.age}YRS
                    </p>
                  </div>
                  <p className="text-[7px] tracking-[0.25em]">
                    {props.job}, {props.place}
                  </p>
                </div>
              </Link>

              <div
                className={
                  hover
                    ? "absolute top-[18%] shadow-xl bg-gray-500 bg-opacity-[40%] h-[70px] flex flex-col justify-around right-0 text-white rounded-tl-lg rounded-bl-lg outline outline-transparent p-[5px] border-[1px] border-gray-100 ease-in-out duration-300"
                    : "fixed left-[-100%]"
                }
              >
                <button
                  className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full"
                  onClick={handleSendRequest}
                >
                  <Heart size={10} />
                </button>
                <button
                  className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full"
                  onClick={handleShortlistRequest}
                >
                  <Star size={10} />
                </button>
                <button className="bg-[#FFFFFF] bg-opacity-[20%] p-1 w-[18.4px] h-[14px] flex items-center justify-center rounded-full">
                  <X size={10} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HomeCardComponents;



