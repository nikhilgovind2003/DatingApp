import React from 'react'
import { LeftBar, RightBar } from '../Components';
import { Outlet } from 'react-router-dom';
import { HomePage } from '../pages';

const DesktopLayout = ()=>{
    return(
        <div className="flex">
        
        <aside className="w-1/4 h-screen  bg-gray-200">
            <LeftBar />
        </aside>
    
        
        <main className="w-2/4 px-20 bg-white">
            <HomePage />
        </main>
    
       
        <aside className="w-1/4  bg-gray-200">
            <RightBar />
        </aside>
    </div>
    
    )
}
export default DesktopLayout;