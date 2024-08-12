import { Search } from "lucide-react";
import { Userdata } from "../../datas/Userdata";
import PageTitle from "../../components/PageTitle/PageTitle";
import { UserPreview } from "../../Components";


const RejectPage = () => {
  // Group users by the first letter of their first name
  const groupedUsers = Userdata.reduce((acc, user) => {
    const firstLetter = user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Sent"} />
      <div className="rounded-t-4xl bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
        {Object.keys(groupedUsers).sort().map(letter => (
          <div key={letter}>
            <h1 className="text-xl font-semibold mt-6 ms-10 sm:ms-7">{letter}</h1>
            {groupedUsers[letter].map(user => {
              const name = `${user.firstName} ${user.lastName}`;
              return (
                <UserPreview
                  key={user.id}
                  name={name}
                  url={user.img}
                  bio={user.bio}
                  close={true}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RejectPage;
