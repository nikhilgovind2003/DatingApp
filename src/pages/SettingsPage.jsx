import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { Search, SearchIcon } from "lucide-react";
import BottomNavbar from '../components/BottomNavbar';
import { UserPreview, UserSetting } from '../Components';

function SettingsPage() {
    return (
        // <div>
        //     <PageTitle icon={SearchIcon} pageTitle="Settings" />

        //     <UserSetting />
        //     <BottomNavbar/>
        // </div>
        <div className="bg-deep-plum h-screen overflow-y-auto">
            <PageTitle icon={Search} pageTitle={"Settings"} />
            <div className="rounded-t-4xl bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 ">
                <UserPreview 
                qr={true}
                name={'Nico Robin'}
                bio={'Never give up 💪'}/>
                <UserSetting />
            </div>
        </div>
    )
}
export default SettingsPage
