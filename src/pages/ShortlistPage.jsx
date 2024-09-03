import React, { useEffect, useState } from 'react';
import { Userdata } from '../datas/Userdata';
import { UserPreview } from '../components';
import PageTitle from '../components/PageTitle/PageTitle';
import { Search } from 'lucide-react';
import axios from 'axios';

const ShortlistPage = () => {

  const [shortlistData, setShortlistData] = useState([]);
  const [shortLists, setShortLists] = useState([]);

  useEffect(() => {
    const fetchRequestedLists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/user', { withCredentials: true });
        setShortLists(response.data[0].shortlistedProfiles);
        console.log(response.data[0].shortlistedProfiles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestedLists();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requests = shortLists.map(userId =>
          axios.get(`http://localhost:5000/api/v1/users/profile/${userId}`)
        );
        const responses = await Promise.all(requests);
        const allUserData = responses.map(response => response.data);
        setShortlistData(allUserData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [shortLists]);

  // Function to handle removing shorlist
  const handleRemoveRequest = async (userId) => {

    try {

      await axios.delete(`http://localhost:5000/api/v1/users/delete-shortlist/${userId}`, { withCredentials: true });
      setShortLists(prev => prev.filter(id => id !== userId));
      setShortlistData(prev => prev.filter(user => user.user._id !== userId));
    } catch (error) {
      console.log('Failed to remove friend request:', error);
    }
  };


  // Group users by the first letter of their first name
  const groupedUsers = shortlistData.reduce((acc, user) => {
    const firstLetter = user.user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Shortlisted"} />
      <div className="rounded-t-4xl bg-white h-[600px] overflow-y-auto pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>
            {groupedUsers[letter].map(user => {
              const name = `${user.user.firstName} ${user.user.lastName}`;
              return (
                <UserPreview
                  key={user.user._id}
                  userId={user.user._id}
                  name={name}
                  url={user.profileImage.url}
                  bio={user.bio}
                  fav={true}
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

export default ShortlistPage;
