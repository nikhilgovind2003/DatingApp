import { API_URL } from "@/apiConfig";
import { useEffect, useState } from "react";
import { UserPreview } from "../components";
import PageTitle from "../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const ShortlistByPage = () => {
  const [shortLists, setShortLists] = useState([]);

  useEffect(() => {
    fetchRequestedLists();
  }, []);


  const fetchRequestedLists = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/shortlisted-by-user`,
          {
            withCredentials: true,
          },
        );
        setShortLists(response?.data?.shortListedBy);
      } catch (error) {
        console.log(error);
      }
    };

    

  const handleFav = async (targetUserId) => {
    try {
      await axios.post(
        `${API_URL}/users/shortlist/${targetUserId}`,
        {},
        { withCredentials: true },
      );
      toast.success("Profile shortlisted back!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to shortlist profile",
      );
    }
  };

  // const handleClose = async (targetUserId) => {
  //   try {
  //     await axios.delete(`${API_URL}/users/delete-shortlist/${targetUserId}`, {
  //       withCredentials: true,
  //     });
  //     // Update UI by removing the user from shortlistData
  //     setShortlistData((prev) => prev.filter((u) => u?.id !== targetUserId));
  //     toast.success("User removed from list");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to remove user");
  //   }
  // };

  // Group users by the first letter of their first name
  const groupedUsers = shortLists.reduce((acc, user) => {
    const firstLetter = user?.firstName?.charAt(0)?.toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});


  if (shortLists?.length === 0) {
    return (
      <div className="bg-deep-plum h-screen overflow-y-auto">
        <PageTitle icon={Search} pageTitle={"Shortlisted By"} />
        <div className="rounded-t-4xl h-screen overflow-y-auto bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No users have shortlisted you yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Shortlisted By"} />
      <div className="rounded-t-4xl h-screen overflow-y-auto bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum">
        {Object.keys(groupedUsers)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">
                {letter}
              </h1>
              {groupedUsers[letter].map((user, index) => {
                const name = `${user.firstName} ${user.lastName}`;
                return (
                  // <Link key={index} to={`/profile/${user._id}`}>
                    <UserPreview
                    userId={user._id}
                    key={index}
                      name={name}
                      url={user?.profile?.profileImage?.url}
                      bio={user.bio}
                      fav={true}
                      close={true}
                      onFav={()=> handleFav(user._id)}
                      // onClose={handleClose}
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

export default ShortlistByPage;
