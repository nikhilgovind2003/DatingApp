import { API_URL } from "@/apiConfig";
import { toast } from 'sonner';
import { Heart, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";

const HomeCardComponents = (props) => {
  const { isOnline } = useSocket();
  const online = isOnline(props.userId);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(true);

  const userInfo = useSelector((state) => state.userAuth?.userInfo);
  const loggedInUserId = userInfo?._id;

  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false);

  useEffect(() => {
    // Simulate loading time before showing the actual content
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loggedInUserId && props.shortListedBy) {
      setIsShortlisted(props.shortListedBy.includes(loggedInUserId));
    } else {
      setIsShortlisted(false);
    }
  }, [props.shortListedBy, loggedInUserId]);

  useEffect(() => {
    if (loggedInUserId && props.friendRequests) {
      const sent = props.friendRequests.some(
        (req) => (req.from?._id || req.from) === loggedInUserId
      );
      setIsSentRequest(sent);
    } else {
      setIsSentRequest(false);
    }
  }, [props.friendRequests, loggedInUserId]);

  const handleSendRequest = async () => {
    try {
      if (isSentRequest) {
        await axios.delete(`${API_URL}/users/friend-request/${props.userId}`, { withCredentials: true });
        setIsSentRequest(false);
        toast.success('Friend request cancelled!');
      } else {
        await axios.patch(`${API_URL}/users/send/${props.userId}`, {}, { withCredentials: true });
        setIsSentRequest(true);
        toast.success('Friend request sent!');
      }
    } catch (error) {
      console.error('Error handling friend request', error);
      toast.error(error.response?.data?.message || 'Error updating friend request');
    }
  };

  const handleShortlistRequest = async () => {
    try {
      if (isShortlisted) {
        await axios.delete(`${API_URL}/users/delete-shortlist/${props.userId}`, { withCredentials: true });
        setIsShortlisted(false);
        toast.success('Removed from shortlist!');
      } else {
        await axios.post(`${API_URL}/users/shortlist/${props.userId}`, {}, { withCredentials: true });
        setIsShortlisted(true);
        toast.success('Shortlisted!');
      }
    } catch (error) {
      console.error('Error handling shortlist request', error);
      toast.error(error.response?.data?.message || 'Error updating shortlist');
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
            backgroundRepeat: 'no-repeat',
            // backgroundAttachment: 'fixed',
          }}
          className={`w-full  h-[220px] rounded-2xl relative overflow-hidden transition-transform duration-300 ease-in-out ${hover ? 'scale-[1.02]' : 'scale-100'} ${loading ? 'animate-pulse bg-gray-300' : ''}`}  // Pulse wireframe
        >

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          {loading ? (
            <div className="h-full w-full bg-gray-200 rounded-2xl"></div>
          ) : (
            <>
              {online && (
                <div className="bg-gray-500 bg-opacity-[20%] text-white backdrop-blur-lg top-2 left-4 absolute text-[10px] px-2 py-0.5 flex items-center gap-1 rounded-full border border-white/20 shadow-sm transition-all duration-300 z-20 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <p className="font-medium tracking-wide">Online</p>
                </div>
              )}

              {/* Entire card Link overlay */}
              <Link to={`/profile/${props.userId}`} className="absolute inset-0 z-10" aria-label={`View ${props.name}'s profile`} />

              {/* Details display (non-interactive to allow card link) */}
              <div className="flex flex-col justify-center w-full absolute bottom-[5%] text-white text-shadow-xl text-[12px] px-4 z-20 pointer-events-none">
                <div className="flex justify-between items-center transition-all duration-300">
                  <p className="">{props.name}</p>
                  <p className="text-[7px] tracking-[0.25em]">
                    {props.gender} {props.age}YRS
                  </p>
                </div>
                <p className="text-[7px] tracking-[0.25em]">
                  {props.job}, {props.place}
                </p>
              </div>

              <div
                className={`absolute shadow-xl bg-white/10 backdrop-blur-md top-[50%] -translate-y-1/2 flex flex-col justify-around text-white rounded-tl-xl rounded-bl-xl p-2 border border-white/20 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) gap-4 inner-shadow z-30 ${hover ? "right-0 opacity-100" : "-right-12 opacity-0"
                  }`}
              >
                <button
                  className="bg-white bg-opacity-[20%] p-1 w-[24px] h-[24px] flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-40 shadow-sm"
                  onClick={handleSendRequest}
                  title={isSentRequest ? "Cancel Friend Request" : "Send Request"}
                >
                  <Heart size={14} fill={isSentRequest ? "white" : "none"} strokeWidth={isSentRequest ? 0 : 2} />
                </button>
                <button
                  className="bg-white bg-opacity-[20%] p-1 w-[24px] h-[24px] flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-40 shadow-sm"
                  onClick={handleShortlistRequest}
                  title={isShortlisted ? "Remove Shortlist" : "Shortlist"}
                >
                  <Star size={14} fill={isShortlisted ? "white" : "none"} strokeWidth={isShortlisted ? 0 : 2} />
                </button>
                <button
                  className="bg-white bg-opacity-[20%] p-1 w-[24px] h-[24px] flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-40 shadow-sm"
                  title="Ignore"
                >
                  <X size={14} />
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



