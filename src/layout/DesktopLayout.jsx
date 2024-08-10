import React from "react";
import { LeftBar, RightBar } from "../Components";
import { Outlet } from "react-router-dom";
import { HomePage } from "../pages";

const DesktopLayout = () => {
  return (
    <div className="flex">
      <aside className="w-1/5 h-screen  hidden sm:block bg-gray-200">
        <LeftBar />
      </aside>

      <main className="w-full relative sm:w-3/5 sm:px-20 bg-white">
        <HomePage />
      </main>

      <aside className="w-1/5 hidden sm:block bg-gray-200">
        <RightBar />
      </aside>
    </div>
  );
};
export default DesktopLayout;
