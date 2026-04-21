import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ButtonGroup = () => {
  const style =
    "px-2 py-2 text-center sm:px-4 sm:py-2 w-full rounded-full font-medium text-sm sm:text-lg md:text-xs lg:text-lg transition-all";

  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);



  const designations =[
    {
      label: "Location",
      path: "/location"
    },
    {
      label: "Designation",
      path: "/designation"
    },
    {
      label: "Qualification",
      path: "/qualification"
    }
  ]


  return (
    <ul className="w-full flex rounded-full bg-pink-200 p-1 justify-between gap-1 sm:gap-2 lg:gap-5 my-5">
      {designations.map((designation, index) => (
        <li
          key={index}
          className={
            path === designation.path
              ? `${style} bg-white text-black-500`
              : `${style} bg-none text-gray-600`
          }
      >
        <Link to={designation.path}>
          {designation.label}
        </Link>
      </li> 
      ))}
    </ul>
  );
};

export default ButtonGroup;
