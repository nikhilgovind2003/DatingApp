import React, { useEffect, useState } from 'react'
import { InteractionIcon, MatchCardComponent, SubHeader } from '../components'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const MatchPage = () => {
  const [user, setUser] = useState([]);
  const [sortedUser, setsortedUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [hasPartnerPreference, setHasPartnerPreference] = useState(true); // State to track partner preference existence

  const userinfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const filterSort = JSON.parse(localStorage.getItem('selectedOptions'))
  const userID = userinfo._id
  const navigate = useNavigate(); // For navigation

  console.log('userid', userID);
  console.log('selectedOptions', filterSort);

  // Fetch all profiles and match percentage data, then compare
  useEffect(() => {
    const getMatchPercent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/compare', { withCredentials: true });
        const filteredUsers = response.data.results.filter(user => user.matchPercentage >= 0);
        const sortedUsers = filteredUsers.sort((a, b) => b.matchPercentage - a.matchPercentage);
        setUser(sortedUsers);
        console.log(sortedUsers);

      } catch (error) {
        console.log(error);
      }
    };

    const getPartnerPreference = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/v1/users/sortfilter/${userID}`, filterSort);
        console.log('length', response.data);
        if (response.data.length === 0) {
          console.log('length', response.data);

          setHasPartnerPreference(false); // Set to false if no partner preferences are found
        } else {
          setsortedUser(response.data);
          setHasPartnerPreference(true); // Set to true if preferences exist
        }
      } catch (error) {
        console.error('Error fetching partner preferences:', error);
        setHasPartnerPreference(false); // Set to false in case of an error
      }
    };

    getMatchPercent();
    getPartnerPreference();
  }, []);

  // Compare and filter common users when both arrays are updated
  useEffect(() => {
    if (user.length > 0 && sortedUser.length > 0) {
      const commonUsers = user.filter(u => sortedUser.some(su => su === u.user.user));
      setFilteredUser(commonUsers);
    }
  }, [user, sortedUser]);

  return (
    <section className='w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-scroll'>
      <div>
        <SubHeader title='Matches' />
        <InteractionIcon />
        {!hasPartnerPreference ? (
          <div className='text-center mt-10'>
            <p className='text-text font-medium my-3 text-lg'>
              Please adjust your partner preferences to find better matches.
            </p>
            <button
              className='bg-light-purple text-white py-2 px-4 rounded-md'
              onClick={() => navigate('/partener_preferences')}
            >
              Set Partner Preferences
            </button>
          </div>
        ) : (
          <>
            <p className='text-text font-medium my-3 text-lg'>
              Your Matches <span className='text-light-purple'>{filteredUser.length}</span>
            </p>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5 mb-24'>
              {filteredUser?.map((user, i) => (
                <Link to={`/profile/${user.user.user}?match=${user.matchPercentage}`} key={i}>
                  <MatchCardComponent
                    isNew={false}
                    img={user.user.profileImage.url}
                    distance={user.distance}
                    name={user.otherUserName}
                    age={user.user.age}
                    place={typeof user.user?.location === 'object' ? JSON.stringify(user.user.location) : user.user.location}
                    match={user.matchPercentage}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default MatchPage
