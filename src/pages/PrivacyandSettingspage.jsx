import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { Search, SearchIcon } from "lucide-react"; 
import PrivacyandSettings from '../components/forms/PrivacyandSettings';
import BottomNavbar from '../components/BottomNavbar';

function PrivacyandSettingspage() {
    return (
        <div>
            <PageTitle icon={SearchIcon} pageTitle="Privacy And Settings" />
            < PrivacyandSettings />
            <BottomNavbar/>
        </div>
    )
}

export default PrivacyandSettingspage
