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
      toast.success('Friend request sent!');
      console.log(props.userId);
    } catch (error) {
      console.error('Error sending friend request', error);
      toast.error(error.response.data.message)
    }
  };

  const handleShortlistRequest = async () => {
    try {
      await axios.post(`${API_URL}/users/shortlist/${props.userId}`, { }, { withCredentials: true });
      toast.success('Shortlisted!');

      console.log(props.userId);
    } catch (error) {
      console.error('Error shortlisting', error);
      toast.error(error.response.data.message)
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
            backgroundSize: 'fit',
            backgroundRepeat: 'no-repeat',
            // backgroundAttachment: 'fixed',
          }}
          className={`w-full h-[220px] rounded-2xl relative overflow-hidden transition-transform duration-300 ease-in-out ${hover ? 'scale-[1.02]' : 'scale-100'} ${loading ? 'animate-pulse bg-gray-300' : ''}`}  // Pulse wireframe
        >
          {loading ? (
            <div className="h-full w-full bg-gray-200 rounded-2xl"></div> // Wireframe placeholder
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
                className={`absolute shadow-xl bg-white/10 backdrop-blur-md top-[50%] -translate-y-1/2 flex flex-col justify-around text-white rounded-tl-xl rounded-bl-xl p-2 border border-white/20 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) gap-4 inner-shadow z-30 ${
                  hover ? "right-0 opacity-100" : "-right-12 opacity-0"
                }`}
              >
                <button
                  className="bg-white bg-opacity-[20%] p-1 w-[24px] h-[24px] flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-40 shadow-sm"
                  onClick={handleSendRequest}
                  title="Send Request"
                >
                  <Heart size={14} />
                </button>
                <button
                  className="bg-white bg-opacity-[20%] p-1 w-[24px] h-[24px] flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-opacity-40 shadow-sm"
                  onClick={handleShortlistRequest}
                  title="Shortlist"
                >
                  <Star size={14} />
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



