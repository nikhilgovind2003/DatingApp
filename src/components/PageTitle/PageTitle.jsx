import React from "react";
import { Link } from "react-router-dom";

function PageTitle({icon:Icon, pageTitle, linkTo }) {
  return (
    <div className="bg-deep-plum py-12 flex font-montserrat justify-center relative">
      {Icon && (
        <Link to={linkTo}>
        <div className="h-9 w-9 absolute left-10 bg-light-purple flex justify-center items-center rounded-full text-white border-2 border-white">
          <Icon size={20} />
        </div>
        </Link>
      )}
      <div className="flex justify-center mt-1">
        <p className="font-Play text-white text-xl">{pageTitle}</p>
      </div>
    </div>
  );
}

export default PageTitle;
