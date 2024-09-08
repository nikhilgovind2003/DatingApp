import React, { useEffect, useState } from "react";
import { ChevronLeft, Navigation,Heart } from "lucide-react";
import ProfileActionbar from "../../components/ProfileActionbar";
import Button from "../../components/buttons/InterestButton";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getIconForInterest } from "../../datas/Interesticon";


function MyProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const queryParams = new URLSearchParams(location.search);
  const matchPercentage = queryParams.get('match');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/profile/${userId}`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, [userId]);

  console.log(user);

  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">
        <div
          className="h-[75vh] overflow-hidden sticky top-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url("${user?.profileImage?.url || 'fallbackImage.jpg'}") center / cover no-repeat`
          }}
        >
          <div className="topnavigation flex p-2 sticky top-6 justify-between">
            <Link to="/home">
              <div className="rounded-full backdrop-filter backdrop-blur-sm bg-opacity-45 border-2 w-fit border-white p-2 text-white">
                <ChevronLeft />
              </div>
            </Link>

            <div className="rounded-full flex border-2 w-fit backdrop-filter backdrop-blur-sm bg-opacity-45 border-white p-2 text-white">
              <Navigation /><span>{2}KM</span>
            </div>
          </div>

          <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
            <div className="text-center">
              <span className="text-3xl text-white text-center">
                {user?.user?.firstName + " " + user?.user?.lastName}
              </span>{" "}
              <br />
              <span className="text-sm text-gray-300">{user?.location?.place || 'usa'}</span>
            </div>
            <div className="text-white text-center py-2 mt-2">
              <span className="inline-flex items-center pl-1 bg-[#4b164c] py-2 rounded-full border-2 border-light-purple">
                <span className="p-2 rounded-full border-4 border-light-purple ">
                  {matchPercentage || 90}%
                </span>
                <span className="px-2">Match</span>
              </span>
            </div>
          </div>
        </div>

        <div
          className="profiledetails cursor-pointer h-full shadow-md p-4 bg-white rounded-t-3xl relative"
          style={{ marginTop: "-100px", zIndex: "50" }}
        >
          <div className="bg-gray-400 rounded-full mx-auto" style={{ width: "60px", padding: "2px" }}></div>
          <div className="overflow-y-auto pb-8">
            <div>
              <span className="text-gray-600">About</span>
              <p className="font-Roboto font-medium">{user?.bio}</p>
            </div>

            {/* Dynamic Interests */}
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex gap-2 justify-center flex-wrap">
                {user?.interests?.[0]?.split(',').map((interest, index) => (
                  <Button
                    key={index}
                    text={interest.trim()} // Use trim() to remove any extra spaces around each interest
                    icon={getIconForInterest(interest.trim())} // Optionally change icon based on the interest
                    initialSelected={false}
                  />
                ))}
              </div>
            </div>

            <div className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/2">
              <ProfileActionbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
