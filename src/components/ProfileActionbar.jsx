import { API_URL, SOCKET_URL } from "@/apiConfig";
import { toast } from 'sonner';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Star, Heart, MessageCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function ProfileActionbar({ userId, from, to, shortListedBy, friendRequests }) {

  const userid = useParams();
  const targetUserId = userid.userId;

  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userAuth?.userInfo);
  const loggedInUserId = userInfo?._id;

  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false);

  useEffect(() => {
    if (loggedInUserId && shortListedBy) {
      setIsShortlisted(shortListedBy.includes(loggedInUserId));
    } else {
      setIsShortlisted(false);
    }
  }, [shortListedBy, loggedInUserId]);

  useEffect(() => {
    if (loggedInUserId && friendRequests) {
      const sent = friendRequests.some(
        (req) => (req.from?._id || req.from) === loggedInUserId
      );
      setIsSentRequest(sent);
    } else {
      setIsSentRequest(false);
    }
  }, [friendRequests, loggedInUserId]);

  const handleSendRequest = async () => {
    if (!targetUserId) return;
    try {
      if (isSentRequest) {
        await axios.delete(`${API_URL}/users/friend-request/${targetUserId}`, { withCredentials: true });
        setIsSentRequest(false);
        toast.success('Friend request cancelled!');
      } else {
        await axios.patch(`${API_URL}/users/send/${targetUserId}`, {}, { withCredentials: true });
        setIsSentRequest(true);
        toast.success('Friend request sent!');
      }
    } catch (error) {
      console.error('Error handling friend request', error);
      toast.error(error.response?.data?.message || 'Error updating friend request');
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await axios.put(`/api/friendRequests/accept/${userId}`, { from });
      toast.success('Friend request accepted!');
    } catch (error) {
      console.error('Error accepting friend request', error);
      toast.error('Error accepting friend request');
    }
  };

  const handleShortlistRequest = async () => {
    if (!targetUserId) return;
    try {
      if (isShortlisted) {
        await axios.delete(`${API_URL}/users/delete-shortlist/${targetUserId}`, { withCredentials: true });
        setIsShortlisted(false);
        toast.success('Removed from shortlist!');
      } else {
        await axios.post(`${API_URL}/users/shortlist/${targetUserId}`, {}, { withCredentials: true });
        setIsShortlisted(true);
        toast.success('Shortlisted!');
      }
    } catch (error) {
      console.error('Error handling shortlist request', error);
      toast.error(error.response?.data?.message || 'Error updating shortlist');
    }
  };

  return (
    <div>
      <div className='shadow-lg p-2 w-fit mx-auto text-lg rounded-full flex backdrop-blur-lg bg-white/30 justify-center gap-8'>
        
        <div className='p-3 cursor-pointer bg-[#E108084D] rounded-full relative group'>
          <X fill="#111" className='text-white' />
          <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-all">
            Don't show
          </span>
        </div>
        
        <div 
          className='p-3 cursor-pointer bg-[#4B164C] rounded-full relative group'
          onClick={handleShortlistRequest}
        >
          <Star fill={isShortlisted ? "white" : "none"} strokeWidth={isShortlisted ? 0 : 2} />
          <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-all">
            {isShortlisted ? "Remove Shortlist" : "Shortlist"}
          </span>
        </div>
        
        <div 
          className='p-3 cursor-pointer bg-[#DD88CF] rounded-full relative group'
          onClick={handleSendRequest}
        >
          <Heart fill={isSentRequest ? "white" : "none"} strokeWidth={isSentRequest ? 0 : 2} />      
          <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-all">
            {isSentRequest ? "Cancel Friend Request" : "Friend Request"}
          </span>
        </div>
        
        <div onClick={()=> navigate(`/chat/${userId}`)} className='p-3 cursor-pointer bg-[#e7a5dc] rounded-full relative group'>
          <MessageCircle fill='white' strokeWidth={0} />      
          <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-all">
            Message
          </span>
        </div>

       
        
      </div>
    </div>
  );
}

export default ProfileActionbar;



