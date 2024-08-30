import React, { useEffect, useState } from "react";
import { ButtonGroup, InteractionIcon, MatchCardComponent, SubHeader, UserIcon } from "../Components";
import { Userdata } from "../datas/Userdata";
import { Link } from "react-router-dom";
import axios from "axios";

const DesignationPage = () => {
  const [users, setUsers] = useState([]);

  const fetchDesignation = async () => {
    try {
      const designationResponse = await axios.get('http://localhost:5000/api/v1/users/profile/designations', { withCredentials: true });
      const matchPercentageResponse = await axios.get('http://localhost:5000/api/v1/users/compare', { withCredentials: true });

      // Assuming the matchPercentageResponse returns an array of objects with user IDs and match percentages
      const matchPercentages = matchPercentageResponse.data.results;

      console.log("match percent:", matchPercentages);
      console.log("qualification response:", designationResponse);

      const combinedData = designationResponse.data.map(user => {
        console.log("User data:", user);
    
        // Find match data by comparing user properties
        const matchData = matchPercentages.find(match => {
            return match.user === user.user;  // Ensure both match.user and user.user exist and are correct
        });
    
        // Log matchData to see if the match was found
        console.log("Match data found:", matchData);
    
        // Return the combined object
        return {
            ...user,
            matchPercentage: matchData ? matchData.matchPercentage : null
        };
    });
    
    // Log the final combined data
    console.log("Combined Data:", combinedData);
      setUsers(combinedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  const count = users.length;

  return (
    <section className="sm: w-screen md:w-full lg:w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
      <div>
        <div className="flex justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen  ">
          <button>
            <UserIcon add={"purple"} />
            <p className="mt-0.5 text-[14px]">My Story</p>
          </button>
          {Userdata?.map((user, i) => (
            <button key={i}>
              <UserIcon key={user.id} story={true} url={user.img} />
              <p className="mt-0.5 text-[14px]">{user.firstName}</p>
            </button>
          ))}
        </div>
        <ButtonGroup />

        <SubHeader title="Designation" />
        <InteractionIcon />
        <p className="text-text font-medium my-3 text-lg">
          Your Matches <span className="text-light-purple">{count}</span>
        </p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {users?.map((user, i) => (
           <Link to={`/profile/${user._id}`} 
           key={i} >
          <MatchCardComponent
            key={i}
            isNew={false}
            img={user.profileImage.url}
            distance={user.distance}
            name={user.name}
            age={user.age}
            place={user.place}
            match={user.matchPercentage}
          />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DesignationPage;
