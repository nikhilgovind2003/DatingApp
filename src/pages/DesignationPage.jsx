import React from "react";
import { ButtonGroup, InteractionIcon, MatchCardComponent, SubHeader, UserIcon } from "../Components";
import { Userdata } from "../datas/Userdata";

const DesignationPage = () => {
  return (
    <section className="w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto">
      <div>
        <div className="lg:flex justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen hidden ">
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
          Your Matches <span className="text-light-purple">42</span>
        </p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {Userdata?.map((user, i) => (
          <MatchCardComponent
            key={i}
            isNew={false}
            img={user.img}
            distance={user.distance}
            name={user.firstName}
            age={user.age}
            place={user.place}
            match={user.match}
          />
        ))}
      </div>
    </section>
  );
};

export default DesignationPage;
