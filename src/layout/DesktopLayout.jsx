 import { Outlet } from 'react-router-dom';
import { LeftBar, RightBar } from '../components';
import useMyProfile from '../hooks/useMyProfile';



const DesktopLayout = ()=>{
    useMyProfile();
    return(
        <>
        
        <div className="grid md:grid-cols-12 gap-4 min-h-screen overflow-hidden w-full">    
            <aside className="md:col-span-3 md:grid hidden overflow-hidden h-screen">
                <LeftBar />
            </aside>
        
            
            <main className="md:col-span-6">
                <Outlet />
            </main>
        
        
            <aside className="md:col-span-3 md:grid hidden overflow-x-auto">
                <RightBar />
            </aside>
        </div>
    </>
  );
};
export default DesktopLayout;
