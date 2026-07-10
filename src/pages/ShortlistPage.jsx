import { API_URL } from "@/apiConfig";
import { useEffect, useState } from "react";
import { UserPreview } from "../components";
import PageTitle from "../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import axios from "axios";

const ShortlistPage = () => {
  const [shortLists, setShortLists] = useState([]);
  useEffect(() => {
    const fetchRequestedLists = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/shortlist`, {
          withCredentials: true,
        });
        setShortLists( response.data?.shortlistedProfiles || []);
      } catch (error) {
        console.log("Error fetching shortlisted profiles:", error);
      }
    };

    fetchRequestedLists();
  }, []);

  // Function to handle removing a shortlist entry
  const handleRemoveRequest = async (userId) => {
    if (!userId) {
      console.log("Invalid userId");
      return; // Exit if userId is null or undefined
    }

    try {
      await axios.delete(`${API_URL}/users/delete-shortlist/${userId}`, {
        withCredentials: true,
      });
      setShortLists((prev) => prev.filter((id) => id !== userId));
    } catch (error) {
      console.log("Failed to remove user from shortlist:", error);
    }
  };

  // Group users by the first letter of their first name
  const groupedUsers = shortLists.reduce((acc, user) => {
    const firstName = user?.firstName || "";
    const firstLetter = firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  if (shortLists.length === 0) {
    return (
      <div className="bg-deeplum h-screen overflow-y-auto">
        <PageTitle icon={Search} pageTitle={"Shortlisted"} />
        <div className="rounded-t-4xl bg-white h-screen overflow-y-auto pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum flex items-center justify-center">
          <p className="text-center text-gray-500 mt-10">
            No shortlisted users
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Shortlisted"} />
      <div className="rounded-t-4xl bg-white h-screen overflow-y-auto pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {Object.keys(groupedUsers)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">
                {letter}
              </h1>
              {groupedUsers[letter].map((user, index) => {
                const name = `${user?.firstName || ""} ${user?.lastName || ""}`;
                return (
                  // <Link key={index} to={`/profile/${user?._id}`}>
                    <UserPreview
                      userId={user?._id}
                      key={index}
                      name={name}
                      url={
                        user?.profile?.profileImage?.url ||
                        "/default-image-url.jpg"
                      }
                      bio={user?.bio || ""}
                      fav={true}
                      close={handleRemoveRequest}
                    />
                  // </Link>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShortlistPage;
