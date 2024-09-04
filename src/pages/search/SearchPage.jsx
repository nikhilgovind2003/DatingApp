import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SearchPage = () => {
  const [value, setValue] = useState("");
  const [click, setClick] = useState(false);
  const inputRef = useRef(null);
  const clearAll = () => {
    setValue("");
    setClick(false);
  };
  const eventHandler = (e) => {
      setValue(e.target.value);
      setClick(true)
  };

  return (
    <div className="h-screen pt-4 w-full" onClick={() => setClick(false)}>
      <h1 className=" text-3xl font-semibold ">Search</h1>

      <form action="POST">
        <div className="border-2 border-black w-[500px] mt-12 pr-2 flex items-center justify-between">
          <input
            type="text"
            value={value}
            className=" w-full border-none p-2 outline-none"
            placeholder="Search..."
            onChange={eventHandler}
          />
          {click && (
            <div onClick={clearAll}>
              <X className=" cursor-pointer" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchPage;
