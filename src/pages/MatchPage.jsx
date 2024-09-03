import React, { useEffect, useState } from 'react'
import { InteractionIcon, MatchCardComponent, SubHeader } from '../Components'
import { Userdata } from '../datas/Userdata'
import axios from 'axios'
import { Link } from 'react-router-dom'

const MatchPage = () => {

    const [user, setUser] = useState([]);
    const [matchPercentage, setMatchPercentage] = useState(null); // State to store the match percentage
    
    // Fetch all profiles and match percentage data, then compare
    useEffect(() => {
      const getMatchPercent = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/users/compare', { withCredentials: true });
    
          // Filter users with matchPercentage greater than 70%
          const filteredUsers = response.data.results.filter(user => user.matchPercentage > 10);
    
          // Sort the filtered users by matchPercentage from high to low
          const sortedUsers = filteredUsers.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
          // Set the filtered and sorted users to state
          setUser(sortedUsers);
        } catch (error) {
          console.log(error);
        }
      };
    
      getMatchPercent();
    }, []);
    

  return (
    <section className='w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto'>
            <div>
            <SubHeader title='Matches'/>
                <InteractionIcon />
                <p className='text-text font-medium my-3 text-lg'>Your Matches <span className='text-light-purple'>{user.length}</span></p>
            </div>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5'>
                {user?.map((user, i) => (
                    <Link to={`/profile/${user.user._id}?match=${user.matchPercentage}`} key={i}>
                    <MatchCardComponent
                        key={i}
                        isNew={false}
                        img={user.user.profileImage.url}
                        distance={user.distance}
                        name={user.otherUserName}
                        age={user.age}
                        place={user.place}
                        match={user.matchPercentage}
                    />
                    </Link>
                ))}
            </div>
        </section>
  )
}

export default MatchPage