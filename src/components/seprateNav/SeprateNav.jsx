import { ChevronLeft, Settings2 } from "lucide-react";
import React from "react";
import './SeprateNav.css'

function SeprateNav() {
  return (
    <div className="p-2">
      <nav className="min-h-10 bg-white w-full sm:w-full md:w-full flex justify-between items-center p-2">
        <ChevronLeft size={36} color="#000000" className="icon bg-white rounded-full  border-slate-950	 border-solid" />
        <h1 className="headText">Location</h1>
        <Settings2 size={36} color="#000000" className="icon bg-white rounded-full  border-slate-950	 border-solid" />
      </nav>
    </div>
  );
}

export default SeprateNav;
