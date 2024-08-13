import React from "react";

import { HomeCard, LeftBar, RightBar, UserPreview } from "../Components";
import { Bell } from "lucide-react";
import PageTitle from "../components/PageTitle/PageTitle";
import Sent from "./Sent/Sent";
import Accept from "./Accept/Accept";
import Groups from "./groups/Groups";
import CreateGroup from "./createGroup/CreateGroup";

const HomePage = () => {
  return (
       <div>
        <CreateGroup />
       </div>
   
  )
}


export default HomePage;
