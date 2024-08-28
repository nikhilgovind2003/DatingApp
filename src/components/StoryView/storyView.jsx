import React, { useEffect, useState } from "react";
import { Userdata } from "../../datas/Userdata";
import { UserIcon } from "../index";
import { config } from "dotenv";
import axios from "axios";

const storyView = () => {



    const [getStory, setgetStory] = useState({})


    useEffect(() => {
        try {
            const getStories = async() => {
                
                const res = await axios.get("http://localhost:5000/getStories", config)
                setgetStory(res.data.userStories)
                console.log("Successfully");
            }
            
            getStories()

        } catch (error) {
            console.log(error);
            
        }
    },[])







    return (
        <div className=" flex gap-4">
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
  );
};

export default storyView;
