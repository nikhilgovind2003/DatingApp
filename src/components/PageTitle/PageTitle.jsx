import React from "react";

function PageTitle({ icon: Icon, pageTitle }) {
  return (
    <div className="bg-deep-plum py-12 flex font-montserrat justify-center">
      {Icon && (
        <div className="h-9 w-9 fixed left-5 bg-light-purple flex justify-center items-center rounded-full text-white border-2 border-white">
          <Icon size={20} />
        </div>
      )}
      <div className="flex justify-center mt-1 ">
        <p className="text-white text-xl">{pageTitle}</p>
      </div>
    </div>
  );
}

export default PageTitle;
