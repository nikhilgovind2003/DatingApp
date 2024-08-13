

import { BellPlus, MoveLeft } from "lucide-react";
import React from "react";
import "./CreateGroup.css";
import { UserIcon } from "../../Components";

function CreateGroup() {
  return (
    <div className=" w-full">
      <div className="min-h-10 bg-pink-50 w-full p-3">
        {/* Header Section */}
        <div className="flex justify-between items-center p-2">
          <h2 className="headText mt-1">BuddyPair</h2>
          <BellPlus size={28} strokeWidth={1.25} className="mt-1" />
        </div>

        {/* Sub-header Section */}
        <div className="flex justify-between items-center p-2">
          <MoveLeft size={36} color="#000" className="p-1" />
          <h2 className="text-black">createGroup</h2>
        </div>

        {/* Group Details */}
        <div className="p-3">
          <h2 className="headMake1">Group Title</h2>
          <h4 className="headMake2">Group Description</h4>
          <h1 className="headMake3">Make a Group call with friend's</h1>
          <h6 className="headMake2">Group Admin</h6>

          {/* Admin Info */}
          <div className="mt-4 flex items-center">
            <UserIcon />
            <div className="ml-2">
              <h6>Rashid Khan</h6>
              <h6 className="headMake2">Group Admin</h6>
            </div>
          </div>

          {/* Invited Members */}
          <h6 className="headMake2 mt-5">Invited Members</h6>
          <div className="grid gap-4 grid-cols-4 p-3 h-auto">
            <UserIcon />
            <UserIcon />
            <UserIcon />
            <UserIcon />
            <UserIcon />
            <UserIcon />
            <UserIcon />
            <UserIcon />
          </div>

          {/* Create Button */}
          <div className="flex justify-center mt-10">
            <button className="rounded-lg bg-deep-plum p-3 text-white w-full">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
