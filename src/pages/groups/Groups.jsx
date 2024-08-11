
import {
  ChevronLeft,
  Headphones,
  MessageCircle,
  MoveLeft,
  PhoneCall,
  Search,
  Video,
} from "lucide-react";
import React from "react";
import "./Groups.css";

function Groups() {
  return (
    <div className="min-h-full bg-deep-plum w-full sm:w-full md:w-full  xl:w-3/4 mb-10">
      <div>.</div>
      <div>
        <h2 className="headText mt-10">BuddyPair</h2>
        <MoveLeft
          size={36}
          color="#ffff"
          className="mt-5 ml-5 p-1 sm:icon-sm md:icon-md lg:icon-lg	"
        />
      </div>
      <div className="container1 min-h-full bg-white w-full shadow-lg p-4">
        <div className="flex justify-between p-3">
          <Search
            size={36}
            className="cursor-pointer p-1 sm:icon-sm md:icon-md lg:icon-lg"
          />
          <h3 className="groupText text-black font-semibold text-xl">Groups</h3>
          <div>.</div>
        </div>
        <div className="container2 flex justify-between items-center p-2 ">
          {/* Left Section: Icon and Text */}
          <div className="flex items-center space-x-3">
            <Headphones
              className="bg-white rounded-full p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
            <h3 className="text-black font-montserrat text-lg">Team Align</h3>
          </div>

          {/* Right Section: Action Icons */}
          <div className="flex space-x-4">
            <MessageCircle
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#000599"
            />
            <PhoneCall
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
            <Video
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
          </div>
        </div>
        {/* ///////////////////////////////// */}
        <div className="container2 flex justify-between items-center p-2 ">
          {/* Left Section: Icon and Text */}
          <div className="flex items-center space-x-3">
            <Headphones
              className="bg-white rounded-full p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
            <h3 className="text-black font-montserrat text-lg">Team Align</h3>
          </div>

          {/* Right Section: Action Icons */}
          <div className="flex space-x-4">
            <MessageCircle
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#000599"
            />
            <PhoneCall
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
            <Video
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
          </div>
        </div>
        {/* //////////////////////////////////////////////// */}
        <div className="container2 flex justify-between items-center p-2 ">
          {/* Left Section: Icon and Text */}
          <div className="flex items-center space-x-3">
            <Headphones
              className="bg-white rounded-full p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
            <h3 className="text-black font-montserrat text-lg">Team Align</h3>
          </div>

          {/* Right Section: Action Icons */}
          <div className="flex space-x-4">
            <MessageCircle
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#000599"
            />
            <PhoneCall
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
            <Video
              className="cursor-pointer hover:text-white p-1 sm:icon-sm md:icon-md lg:icon-lg"
              color="#67676f"
            />
          </div>
        </div>
      </div>      
    </div>
  );
}

export default Groups;
