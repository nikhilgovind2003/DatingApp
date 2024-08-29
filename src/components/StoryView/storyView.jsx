import React, { useEffect, useState } from "react";
import { Userdata } from "../../datas/Userdata";
import { UserIcon } from "../index";
import { config } from "dotenv";
import axios from "axios";
import { Link } from "react-router-dom";

const storyView = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/story", config);
        let userData = res.data.userStories;
        setStories(
          userData.map((user) => ({
            id: user._id,
            profileImage: user.profileImage.url,
          }))
        );
        console.log("Successfully fetched stories");
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    getStories();
  }, []);


  stories.map(U => {
    console.log(U.profileImage);
    
  })






  return (
    <div className=" flex gap-4">
      <button>
        <UserIcon add={"purple"} />
        <p className="mt-0.5 text-[14px]">My Story</p>
      </button>
      {stories?.map((user, i) => (
        <button key={i}>
          <Link to={`/story/${user.id}`}>
            <UserIcon key={user.id} story={true} url={user.profileImage} />
            <p className="mt-0.5 text-[14px]">Arjun</p>
          </Link>
        </button>
      ))}
    </div>
  );
};

export default storyView;
