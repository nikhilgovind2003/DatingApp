import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  InteractionIcon,
  MatchCardComponent,
  SubHeader,
  ButtonGroup,
  UserIcon,
} from "../Components";
import { Userdata } from "../datas/Userdata";
import { Link } from "react-router-dom";

const LocationPage = () => {
  const [nearByUsers, setNearByUsers] = useState([]);

  const matchByLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/matchbylocation",{withCredentials: true}
      );
      setNearByUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    matchByLocation();
  }, []);

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

        <SubHeader title="Location" />
        <InteractionIcon />
        <p className="text-text font-medium my-3 text-lg">
          Your Matches <span className="text-light-purple">{nearByUsers.length}</span>
        </p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {nearByUsers?.map((user) => (
          <Link to={`/profile/${user._id}`} key={nearByUsers.id}>
            <MatchCardComponent
              isNew={false}
              img={user.profileImage.url}
              distance={user.distance.toFixed(2)}
              name={user.name}
              age={user.age}
              place={user.location.place}
              match="100"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LocationPage;
