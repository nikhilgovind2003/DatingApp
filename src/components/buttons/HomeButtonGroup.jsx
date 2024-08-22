import { useState } from "react";
import { Link } from "react-router-dom";

const ButtonGroup = () => {
  const style =
    "px-2 py-2 text-center sm:px-4 sm:py-2 w-full rounded-full font-medium text-sm sm:text-lg md:text-xs lg:text-lg transition-all";

  const [path, setpath] = useState("");
  
  console.log(path);

  return (
    <ul className="w-full hidden lg:flex space-x-2 rounded-full bg-pink-100 p-1 justify-between gap-1 sm:gap-2 lg:gap-5 my-5">
      <li
        onClick={() => setpath("location")}
        className={
          path === "location"
            ? `${style} bg-primary text-blue-500`
            : `${style} bg-none text-gray-600`
        }
      >
        <Link to="/location">Location</Link>
      </li>

      <li
        onClick={() => setpath("designation")}
        className={
          path === "designation"
            ? `${style} bg-primary text-blue-500`
            : `${style} bg-none text-gray-600`
        }
      >
        <Link to="/designation">Designation</Link>
      </li>
      <li
        onClick={() => setpath("qualification")}
        className={
          path === "qualification"
            ? `${style} bg-primary text-blue-500`
            : `${style} bg-none text-gray-600`
        }
      >
        <Link to="/qualification">Qualification</Link>
      </li>
    </ul>
  );
};

export default ButtonGroup;
