import { AlertCircle, Bell, CircleX, CircleCheckBig } from "lucide-react";
import NotificationComponent from "./notificationComponent";
import { Link } from "react-router-dom";
import { useState } from "react";
const notificationBar = () => {

  return (
    <div className=" w-full p-4 backdrop-blur-lg h-full z-10">
      <nav className="absolute right-14 lg:right-24 border-2 border-gray-300 rounded-full p-2 mb-4">
        <Link to="/">
          <Bell />
        </Link>
      </nav>

      <div className="flex flex-col items-center gap-4 justify-center w-full mt-16">
        <NotificationComponent
          message="news" logo={<></>}
          />
        <NotificationComponent
          message="Successfully" color={"text-green-500"} logo={<CircleCheckBig />}
          />
        
        <NotificationComponent
          message="Alert" color={"text-yellow-500"} logo={<AlertCircle />}
          />
        
        <NotificationComponent
          message="Error" color={"text-red-500"} logo={<CircleX/>}
          />
        
        
      </div>
    </div>
  );
};

export default notificationBar;
