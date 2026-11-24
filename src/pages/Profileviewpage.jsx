import { useEffect, useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import ProfileActionbar from "../components/ProfileActionbar";
import Button from "../components/buttons/InterestButton";
import { Api } from "@/lib/utils";

import PageTitle from "@/components/PageTitle/PageTitle";
import { useNavigate } from "react-router-dom";

function Profileviewpage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProfile = async () => {
    const { data } = await Api(`users/get-profile`);

    if (data) setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="bg-deep-plum h-screen overflow-y-auto">
        <PageTitle icon={Search} pageTitle={"Profile"} />
        <div className="rounded-t-4xl h-screen overflow-y-scroll bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Couldn't load your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto">
        <div
          className="h-[75vh] overflow-hidden sticky top-0 "
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(128, 0, 128, 0.7)), url("${data?.profileDetails?.profileImage?.url ?? ""}") `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // backgroundAttachment: 'fixed',
          }}
        >
          <div className="topnavigation flex p-2 sticky top-6 justify-between">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate(-1)}
              className="rounded-full backdrop-filter backdrop-blur-sm bg-black/40 border-2 w-fit border-white p-2 text-white"
            >
              <ChevronLeft />
            </button>
          </div>

          <div className="mt- absolute bottom-24 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center">
            <div className="text-center">
              <span className="text-3xl text-white text-center">
                {[data.firstName, data.lastName].filter(Boolean).join(" ")}
                {data.profileDetails?.age ? `, ${data.profileDetails.age}` : ""}
              </span>{" "}
              <br />
              <span className="text-sm text-gray-300 uppercase">{data.profileDetails?.location}</span>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div
          className="profiledetails  cursor-pointer h-full shadow-md p-4 bg-white rounded-t-3xl relative"
          style={{ marginTop: "-50px", zIndex: "50" }}
        >
          <div
            className="bg-gray-400 rounded-full mx-auto"
            style={{ width: "60px", padding: "2px" }}
          >
            {/* Avatar or Profile Picture */}
          </div>
          <div className="overflow-y-auto pb-8">
            <div>
              <span className="text-gray-600">About</span>
              <p className="font-Roboto font-medium">
                {data.profileDetails?.bio || "No bio added yet."}
              </p>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Interest</span>
              <div className="flex gap-2 flex-wrap">
                {/* Interests */}
                {(data.profileDetails?.interests || []).flatMap((i) => String(i).split(",")).map((i) => i.trim()).filter(Boolean).map((interest) => (
                  <Button key={interest} text={interest} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Actionbar */}
        <div className="fixed z-50 bottom-10 left-1/2 transform -translate-x-1/2">
          {/* <ProfileActionbar
            userId={currentUserId}
            from={friendRequestFromId}
            to={friendRequestToId}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Profileviewpage;
