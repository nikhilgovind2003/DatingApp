import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import {  SearchIcon } from "lucide-react";
import UserSetting from '../Components/usericons/UserSetting';
import BottomNavbar from '../components/BottomNavbar';

function SettingsPage() {
    return (
        <div>
            <PageTitle icon={SearchIcon} pageTitle="Settings" />
            
            <UserSetting />
            <BottomNavbar/>
        </div>
    )
}
export default SettingsPage
