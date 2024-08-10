import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Search } from "lucide-react";
import { UserPreview } from "../../Components";

function Accept() {
  return (
    <div className="bg-deep-plum">
      <PageTitle icon={Search} pageTitle={"Accept"} />
      <div className="rounded-t-4xl bg-white pt-14 sm:border-2 border-deep-plum">
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
        <UserPreview
          name={"Afrin Sabilla"}
          bio={"Life is not beautifull"}
          phonecall={true}
          video={true}
        />
      </div>
    </div>
  );
}

export default Accept;
