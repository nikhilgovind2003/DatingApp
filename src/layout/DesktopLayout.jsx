import React from 'react'
import { LeftBar, RightBar } from '../Components';
import { Outlet } from 'react-router-dom';

const DesktopLayout = ()=>{
    return(
        <div className="flex">
        
        <aside className="w-1/4 p-4 bg-gray-200">
            <LeftBar />
        </aside>
    
        
        <main className="w-2/4 p-4 bg-white">
            <Outlet />
        </main>
    
       
        <aside className="w-1/4 p-4 bg-gray-200">
            <RightBar />
        </aside>
    </div>
    
    )
}
export default DesktopLayout;