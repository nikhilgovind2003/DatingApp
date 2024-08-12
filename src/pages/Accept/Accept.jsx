import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import { Userdata } from "../../datas/Userdata";
import { UserPreview } from "../../components";

function Accept() {
  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={Search} pageTitle={"Accept"} />
      <div className="rounded-t-4xl bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
        {Userdata?.map(user => {
            const name = user.firstName + " " + user.lastName;
           return (
            <UserPreview
            name={name}
            url={user.img}
            bio={user.bio}
            phonecall={true}
            video={true}
          />
           )
        })}
      </div>
    </div>
  );
}

export default Accept;
