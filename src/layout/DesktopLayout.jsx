
import React from 'react'
import { Outlet } from 'react-router-dom';
import BottomNavbar from '../components/BottomNavbar';
import { LeftBar, RightBar } from '../components';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DesktopLayout = ()=>{
    return(
        <>
        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
    />
        <div className="grid md:grid-cols-12 gap-6 min-h-screen overflow-hidden w-screen">    
            <aside className="md:col-span-3 md:grid hidden overflow-hidden  h-screen">
                <LeftBar />
            </aside>
        
            
            <main className="md:col-span-6 ">
                <Outlet />
                <BottomNavbar 
                className="md:hidden mx-2"/>
            </main>
        
        
            <aside className="md:col-span-3 md:grid hidden overflow-x-auto">
                <RightBar />
            </aside>
        </div>
    </>
  );
};
export default DesktopLayout;
