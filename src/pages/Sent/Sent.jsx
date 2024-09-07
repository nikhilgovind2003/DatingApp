import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import PageTitle from "../../components/PageTitle/PageTitle";
import UserPreview from "../../components/usericons/UserPreview";
import axios from "axios";

const RejectPage = () => {
  const [frdreqData, setFrdreqData] = useState([]);
  const [requestedLists, setRequestedLists] = useState([]);

  useEffect(() => {
    const fetchRequestedLists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/user', { withCredentials: true });
        setRequestedLists(response.data[0]?.requestedLists || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestedLists();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requests = requestedLists.map(userId => 
          axios.get(`http://localhost:5000/api/v1/users/profile/${userId}`)
        );
        const responses = await Promise.all(requests);
        const allUserData = responses.map(response => response.data);
        setFrdreqData(allUserData);
      } catch (error) {
        console.log(error);
      }
    };

    if (requestedLists.length > 0) {
      fetchUserData();
    }
  }, [requestedLists]);

  console.log(frdreqData);
  
  const handleRemoveRequest = async (userId) => {
    if (!userId) {
      console.log('Invalid userId');
      return; // Exit if userId is null or undefined
    }
  
    try {
      // Make the DELETE request
      await axios.delete(`http://localhost:5000/api/v1/users/friend-request/${userId}`, { withCredentials: true });
  
      // Update the requested lists safely
      setRequestedLists(prev => prev.filter(id => id !== userId));
  
      // Safely update the frdreqData
      setFrdreqData(prev => prev.filter(user => user?.user?._id !== userId));
    } catch (error) {
      console.log('Failed to remove friend request:', error);
    }
  };

  // Group users by the first letter of their first name
  const groupedUsers = frdreqData.reduce((acc, user) => {
    const firstName = user?.user?.firstName;
    if (firstName) {
      const firstLetter = firstName.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(user);
    }
    return acc;
  }, {});

  console.log(groupedUsers);
  

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Sent"} />
      <div className="rounded-t-4xl h-[600px] overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>
            {groupedUsers[letter].map(user => {
              const name = `${user?.user?.firstName || ''} ${user?.user?.lastName || ''}`;
              return (
                <UserPreview
                  key={user?.user?._id}
                  userId={user?.user?._id}
                  name={name}
                  url={user?.profileImage?.url || '/default-image-url.jpg'}
                  bio={user?.bio || ''}
                  close={handleRemoveRequest}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RejectPage;
