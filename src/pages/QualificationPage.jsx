import React, { useEffect, useState } from 'react'
import { ButtonGroup, InteractionIcon, MatchCardComponent, SubHeader, UserIcon } from '../Components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Userdata } from "../datas/Userdata";
import { User } from 'lucide-react';


const QualificationPage = () => {
  const [dataqualification, setQualification] = useState([]);

  const fetchQualificationMatches = async () => {
    try {
      const qualificationResponse = await axios.get('http://localhost:5000/api/v1/users/profile/qualification', { withCredentials: true });
      const matchPercentageResponse = await axios.get('http://localhost:5000/api/v1/users/compare', { withCredentials: true });
  
      // Assuming the matchPercentageResponse returns an array of objects with user IDs and match percentages
      const matchPercentages = matchPercentageResponse.data.results;
      console.log("match percent:", matchPercentages);
      console.log("qualification response:", qualificationResponse);
  
      // Combine qualification data with match percentage data
      const combinedData = qualificationResponse.data.map(user => {
        const matchData = matchPercentages.find(match => match.user.user === user.user._id);
        console.log("match data:", matchData);
  
        return {
          ...user,
          matchPercentage: matchData ? matchData.matchPercentage : null
        };
      });
  
      // Sort the combined data by matchPercentage from high to low
      const sortedData = combinedData.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
      console.log("sorted data:", sortedData);
      setQualification(sortedData);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchQualificationMatches();
  }, []);
  

  return (
    <section className='sm: w-screen md:w-full overflow-x-hidden lg:w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto'>
      <div>
      <div className="flex justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen  ">
          <button>
            <UserIcon add={"purple"} />
            <p className="mt-0.5 text-[14px]">My Story</p>
          </button>
          {Userdata?.map((user, i) => (
              <Link to={`/story/${user._id}`}>
            <button key={i}>
              <UserIcon key={user.id} story={true} url={user.img} />
              <p className="mt-0.5 text-[14px]">{user.firstName}</p>
            </button>
            </Link>
          ))}
        </div>
        <ButtonGroup />
        <SubHeader title='Qualification' />
        <InteractionIcon />
        <p className='text-text font-medium my-3 text-lg'>Your Matches <span className='text-light-purple'>{dataqualification.length}</span></p>
      </div>

      <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5'>
        {dataqualification?.map((user, i) => (
          <Link to={`/profile/${user._id}?%=${user.matchPercentage}`} key={i} >
            <MatchCardComponent
              isNew={false}
              img={user.profileImage.url}
              distance={user.distance}
              name={user.name}
              age={user.age}
              place={user.location.place}
              match={user.matchPercentage}  // Pass the matchPercentage to the MatchCardComponent
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default QualificationPage
