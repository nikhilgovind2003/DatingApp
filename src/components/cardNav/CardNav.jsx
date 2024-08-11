import React from "react";

function CardNav() {
  return (
    <div className="p-4">
      <div className="min-h-5 rounded-lg shadow bg-purple-200 w-full sm:w-full md:w-full grid gap-4 grid-cols-3 sm:grid-cols-3 md:grid-cols-3 grid-rows-3 p-1 h-12">
        <a href="" className="flex items-center justify-center text-black text-center hover:bg-white hover:text-purple-700	 rounded-lg p-5 h-full">Location</a>
        <a href="" className="flex items-center justify-center text-black text-center hover:bg-white hover:text-purple-700 rounded-lg p-5 h-full">Designation</a>
        <a href="" className="flex items-center justify-center text-black text-center hover:bg-white hover:text-purple-700 rounded-lg p-5 h-full">Qualification</a>
      </div>
    </div>
  );
}
export default CardNav;
