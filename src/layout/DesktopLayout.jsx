
import React from 'react'
import { LeftBar, RightBar } from '../Components';
import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';

const DesktopLayout = () => {
    return (
        <div className="grid md:grid-cols-12 gap-6 min-h-screen overflow-hidden w-screen">

            <aside className="md:col-span-3 md:grid hidden overflow-hidden  h-screen">
                <LeftBar />
            </aside>
            <div className='md:col-span-1'></div>

            <main className="md:col-span-4  ">
                <Outlet />
                <BottomNavbar
                    className="md:hidden mx-2" />
            </main>

            <div className='md:col-span-1'></div>


            <aside className="md:col-span-3 md:grid hidden overflow-x-auto">
                <RightBar />
            </aside>
        </div>
    );
};
export default DesktopLayout;
