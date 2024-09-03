import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  InteractionIcon,
  MatchCardComponent,
  SubHeader,
  ButtonGroup,
  UserIcon,
  StoryView,
} from "../Components";
import { Userdata } from "../datas/Userdata";
import { Link } from "react-router-dom";

const LocationPage = () => {
  const [nearByUsers, setNearByUsers] = useState([]);


  const matchByLocation = async () => {
    try {
      // Fetch users by location
      const locationResponse = await axios.get(
        "http://localhost:5000/api/v1/users/matchbylocation",
        { withCredentials: true }
      );

      // Fetch match percentages
      const matchPercentageResponse = await axios.get(
        "http://localhost:5000/api/v1/users/compare",
        { withCredentials: true }
      );

      // Assuming the matchPercentageResponse returns an array of objects with user IDs and match percentages
      const matchPercentages = matchPercentageResponse.data.results;

      console.log("Match percentages:", matchPercentages);
      console.log("Location response:", locationResponse);

      // Combine the location data with match percentages
      const combinedData = locationResponse.data.map(user => {
        // Find the matching match percentage for the current user
        const matchData = matchPercentages.find(match => match.user.user === user.user);

        // Return the combined object
        return {
          ...user,
          matchPercentage: matchData ? matchData.matchPercentage : null,
        };
      });

      // Log the final combined data
      console.log("Combined Data:", combinedData);

      // Set the state with the combined data
      setNearByUsers(combinedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    matchByLocation();
  }, []);
console.log(nearByUsers)

  return (
    <section className="sm: w-screen md:w-full lg:w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
      <div>
        <div className="flex justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen  ">
        <StoryView />
        </div>
        <ButtonGroup />

        <SubHeader title="Location" />
        <InteractionIcon />
        <p className="text-text font-medium my-3 text-lg">
          Your Matches <span className="text-light-purple">{nearByUsers.length}</span>
        </p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {nearByUsers?.map((user) => (
          <Link to={`/profile/${user.user}?match=${user.matchPercentage}`} key={nearByUsers.id}>
            <MatchCardComponent
              isNew={false}
              img={user.profileImage.url}
              distance={user.distance.toFixed(2)}
              name={user.name}
              age={user.age}
              place={user.location.place}
              match={user.matchPercentage}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LocationPage;
