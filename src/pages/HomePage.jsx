import React from "react";
import { Userdata } from "../datas/Userdata";
import { ButtonGroup, Sidemenu, UserIcon } from "../Components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="lg:w-full md:w-full sm: w-screen pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
      <div className="flex justify-between md:hidden gap-5">
        <Sidemenu />
        <div className="flex gap-3">
          <button className="relative p-2 flex items-center rounded-full border-2 w-16 h-16">
            <Link to="/notification">
              <HiOutlineBell className="w-9 h-9 text-text ms-1" />
            </Link>
            <div className=" bg-light-purple border border-primary absolute top-[16.5px] right-[19.5px] rounded-full w-[8px] h-[8px]"></div>
          </button>
          <button>
            <UserIcon />
          </button>
        </div>
      </div>
      <div className="flex  justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen ">
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
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {Userdata.map((user, i) => {
          const name = user.firstName + " " + user.lastName;
          return (
            <HomeCardComponents
              key={i}
              img={user.img}
              name={user.name}
              sex={user.gender}
              age={user.age}
              job={user.job}
              place={user.place}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;
