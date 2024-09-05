import React from 'react';
import axios from 'axios';
import { X, Star, Heart, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { SiTicktick } from "react-icons/si";

function ProfileActionbar({ userId, from, to }) {

  const userid = useParams();
  console.log(userid.userId);

  const handleSendRequest = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/users/send/${userid.userId}`, { from, to }, { withCredentials: true });
      alert('Friend request sent!');
      console.log(userid.userId);
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await axios.put(`/api/friendRequests/accept/${userId}`, { from });
      alert('Friend request accepted!');
    } catch (error) {
      console.error('Error accepting friend request', error);
    }
  };

  const handleShortlistRequest = async () => {
    try {
      await axios.post(`http://localhost:5000/api/v1/users/shortlist/${userid.userId}`, { from, to }, { withCredentials: true });
      alert('Shortlisted!');
      console.log(userid.userId);
    } catch (error) {
      console.error('Error shortlisting', error);
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
          <Star fill="white" strokeWidth={0} />
          <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-all">
            Shortlist
          </span>
        </div>
        
        <div 
          className='p-3 cursor-pointer bg-[#DD88CF] rounded-full relative group'
          onClick={handleSendRequest}
        >
          <Heart fill='white' strokeWidth={0} />      
          <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-all">
            Friend Request
          </span>
        </div>
        
        <div className='p-3 cursor-pointer bg-[#e7a5dc] rounded-full relative group'>
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
