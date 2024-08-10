import React from 'react'
import { LeftBar, RightBar } from '../Components';
import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';

const DesktopLayout = ()=>{
    return(
        <div className="grid md:grid-cols-12 gap-6 min-h-screen w-screen">
        
        <aside className="md:col-span-3 md:grid hidden h-screen">
            <LeftBar />
        </aside>
    
        
        <main className="md:col-span-6 bg-lime-300 mx-5 md:mx-0 min-h-screen relative">
            <Outlet />
            <BottomNavbar 
            className="md:hidden "/>
        </main>
    
       
        <aside className="md:col-span-3 md:grid hidden overflow-x-auto">
            <RightBar />
        </aside>
    </div>
    
    )
}
export default DesktopLayout;