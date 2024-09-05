import React, { useEffect, useState } from 'react';
import { UserPreview } from '../components';
import PageTitle from '../components/PageTitle/PageTitle';
import { Search } from 'lucide-react';
import axios from 'axios';

const ViewedMyProfilePage = () => {
  const [viewedBy, setViewedBy] = useState([]);
  const [viewedByData, setViewedByData] = useState([]);

  useEffect(() => {
    const fetchRequestedLists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/user', { withCredentials: true });
        setViewedBy(response.data[0].viewedBy);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestedLists();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requests = viewedBy.map(userId =>
          axios.get(`http://localhost:5000/api/v1/users/profile/${userId}`)
        );
        const responses = await Promise.all(requests);
        const allUserData = responses.map(response => response.data);
        setViewedByData(allUserData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [viewedBy]);

  // console.log('viewed by data --->', viewedByData);
  const handleRemoveRequest = async (userId) => {

    try {

      await axios.delete(`http://localhost:5000/api/v1/users/delete-shortlist/${userId}`, { withCredentials: true });
      setViewedBy(prev => prev.filter(id => id !== userId));
      setViewedByData(prev => prev.filter(user => user.user._id !== userId));
    } catch (error) {
      console.log('Failed to remove friend request:', error);
    }
  };
  // Group users by the first letter of their first name
  const groupedUsers = viewedByData.reduce((acc, userObj) => {
    const firstLetter = userObj.user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(userObj);
    return acc;
  }, {});

  return (
    <div className="bg-deep-plum min-h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Viewed My Profile"} />
      <div className="rounded-t-4xl bg-white h-[82vh] pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>
            {groupedUsers[letter].map(userObj => {
              const name = `${userObj.user.firstName} ${userObj.user.lastName}`;
              const profileImageUrl = userObj.profileImage ? userObj.profileImage.url : '';

              return (
                <UserPreview
                  key={userObj.user._id}
                  name={name}
                  url={profileImageUrl}
                  bio={userObj.bio || ''}
                  fav={true}
                  close={close}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewedMyProfilePage;
