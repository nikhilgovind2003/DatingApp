import { UserPreview } from "@/components";
import { Api } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [value, setValue] = useState("");
  const [click, setClick] = useState(false);

  const [result, setResult] = useState([]);
  const clearAll = () => {
    setValue("");
    setClick(false);
  };
  const eventHandler = (e) => {
    setValue(e.target.value);
    setClick(true);
  };

  const getSearchResult = async () => {
    const { data, error } = await Api(
      `api/v1/users/get-search-users?search=${value}`,
    );

    if (data) {
      setResult(data);
    }
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [value]);


  const groupedUsers = result.reduce((acc, user) => {
    const firstName = user?.firstName;
    if (firstName) {
      const firstLetter = firstName.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(user);
    }
    return acc;
  }, {});



  return (
    <div className="h-screen pt-4 w-full" onClick={() => setClick(false)}>
      <h1 className="text-3xl font-semibold">Search</h1>
      <form action="POST">
        <div className="border-2 border-black mt-12 pr-2 flex items-center justify-between">
          <input
            type="text"
            value={value}
            className="w-full border-none p-2 outline-none"
            placeholder="Search..."
            onChange={eventHandler}
          />
          {click && (
            <div onClick={clearAll}>
              <X className="cursor-pointer" />
            </div>
          )}
        </div>
      </form>

      {/*
      
          {
        "firstName": "Nikhil",
        "lastName": "Smart",
        "location": "Palakkad ",
        "profileImage": {
            "publicId": "profiles",
            "url": "https://res.cloudinary.com/dwrptzvbd/image/upload/v1783586831/profiles.jpg"
        }
    },

      */}

      <div className="mt-4">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>

        {groupedUsers[letter].map((user, index) => {
          return (
            <UserPreview
              key={index}
              userId={user?.user?._id}
              name={user?.firstName + " " + user?.lastName}
              url={user?.profileImage?.url || "/default-image-url.jpg"}
              bio={user?.bio || ""}
            />
          );
        })}
      </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
