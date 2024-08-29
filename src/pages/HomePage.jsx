import { useEffect } from "react";
import { Userdata } from "../datas/Userdata";
import { ButtonGroup, Sidemenu, StoryView, UserIcon } from "../Components";
import { HiOutlineBell } from "react-icons/hi";
import HomeCardComponents from "../components/Homecards/HomeCardComponents";
import { Link } from "react-router-dom";
import Rightside from "../components/rightsidemenu/Rightside";
import axios from "axios";

const HomePage = () => {
 
  try {

``    
    console.log("Success");
    
  } catch (error) {
    console.log(error.res.data);
    
  }

 
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
          <div className="pt-3">
            <Rightside />

          </div>
        </div>
      </div>
      <div className="flex  justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen ">
     
     <StoryView />
      </div>
      <ButtonGroup />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {Userdata.map((user, i) => {
            const name = user.firstName + " " + user.lastName;
          return (

           <Link to={`/profile/${user.id}`}>
            <HomeCardComponents       
              key={i}
              img={user.img}
              name={user.name}
              sex={user.gender}
              age={user.age}
              job={user.job}
              place={user.place}
              
            />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HomePage;
