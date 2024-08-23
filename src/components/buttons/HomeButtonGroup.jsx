import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ButtonGroup = () => {
  const style =
    "px-2 py-2 text-center sm:px-4 sm:py-2 w-full rounded-full font-medium text-sm sm:text-lg md:text-xs lg:text-lg transition-all";

  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(location.pathname.substring(1)); // Remove leading slash
  }, [location.pathname]);

  return (
    <ul className="w-full hidden lg:flex space-x-2 rounded-full bg-pink-100 p-1 justify-between gap-1 sm:gap-2 lg:gap-5 my-5">
      <li
        className={
          path === "location"
            ? `${style} bg-primary text-blue-500`
            : `${style} bg-none text-gray-600`
        }
      >
        <Link to="/location" onClick={() => setPath("location")}>
          Location
        </Link>
      </li>

      <li
        className={
          path === "designation"
            ? `${style} bg-primary text-blue-500`
            : `${style} bg-none text-gray-600`
        }
      >
        <Link to="/designation" onClick={() => setPath("designation")}>
          Designation
        </Link>
      </li>
      <li
        className={
          path === "qualification"
            ? `${style} bg-primary text-blue-500`
            : `${style} bg-none text-gray-600`
        }
      >
        <Link to="/qualification" onClick={() => setPath("qualification")}>
          Qualification
        </Link>
      </li>
    </ul>
  );
};

export default ButtonGroup;
