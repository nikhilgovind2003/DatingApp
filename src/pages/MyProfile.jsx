import React, { useEffect, useState } from 'react';
import { ChevronLeft, Navigation } from 'lucide-react';
import ProfileActionbar from '../components/ProfileActionbar';
import Button from '../components/buttons/InterestButton';
import { useSelector } from 'react-redux';
import axios from 'axios';


function MyProfile() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const userInfo = useSelector(state => state.userAuth.userInfo);
  console.log(userInfo);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/users"); // Fetch all users from your backend
        const allUsers = response.data;
        setUsers(allUsers); // Store fetched users in state
        console.log("Fetched Data:", allUsers);
        
        // Find the user that matches the current user ID
        const currentUser = allUsers.find(user => user.user._id === userInfo._id);
        setUser(currentUser);
        console.log("Current User:", currentUser);
        
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    if (userInfo && userInfo._id) {
      fetchUsers();
    }
  }, [userInfo]);
  

  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">
      <div
  className="h-[75vh] overflow-hidden sticky top-0 "
  style={{
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url(https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
  }}
>
  <div className="topnavigation flex p-2 sticky top-6 justify-between">
    <div className="rounded-full backdrop-filter backdrop-blur-sm bg-opacity-45 border-2 w-fit border-white p-2 text-white">
      <ChevronLeft />
    </div>
    <div className="rounded-full flex border-2 w-fit backdrop-filter backdrop-blur-sm bg-opacity-45 border-white py-2 px-4 text-white">
      <span>Edit</span>
    </div>
  </div>

  <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
    <div className="text-center">
      <span className="text-3xl text-white text-center">{ userInfo?.firstName + " " + userInfo?.lastName }, 22</span> <br />
      <span className="text-sm text-gray-300">HAMBURG, GERMANY</span>
    </div>
    <div className="text-white text-center py-2 mt-6">
  <span className="inline-flex items-center pl-1  bg-[#4b164c] py-2 rounded-full border-2 border-light-purple">
    <span className="p-2 rounded-full border-4 border-light-purple ">
      80%
    </span>
    <span className='px-2'>Profile Complete</span>
  </span>
</div>

  </div>
</div>

        {/* Profile Details Section */}
        <div className="profiledetails  cursor-pointer h-full shadow-md p-4 bg-white rounded-t-3xl relative" style={{ marginTop: '-50px', zIndex: '50' }}>
          <div className="bg-gray-400 rounded-full mx-auto" style={{ width: '60px', padding: '2px' }}>
            {/* Avatar or Profile Picture */}
          </div>
          <div className="overflow-y-auto pb-8">
            <div>
              <span className="text-gray-600">About</span>
              <p className="font-Roboto font-medium">A good listener. I love having a good talk to know each other’s side 😍.</p>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex gap-2 flex-wrap">
                {/* Interests */}
                <Button text="Football" icon="⚽" selected={false} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MyProfile;

