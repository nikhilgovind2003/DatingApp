import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { Search, SearchIcon } from "lucide-react";
import BottomNavbar from '../components/BottomNavbar';
import { UserPreview, UserSetting } from '../Components';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';

function SettingsPage() {

    const userInfo = useSelector(state => state.userAuth.userInfo);

    const myProfileCookie = Cookies.get('myProfile');
    const decodedMyProfileCookie = decodeURIComponent(myProfileCookie);
    const cleanedMyProfileJson = decodedMyProfileCookie.startsWith('j:') ? decodedMyProfileCookie.slice(2) : decodedMyProfileCookie;
    const myProfile = JSON.parse(cleanedMyProfileJson);
    console.log(myProfile);

    return (
        // <div>
        //     <PageTitle icon={SearchIcon} pageTitle="Settings" />

        //     <UserSetting />
        //     <BottomNavbar/>
        // </div>
        <div className="bg-deep-plum h-screen overflow-y-auto">
            <PageTitle icon={Search} pageTitle={"Settings"} />
            <div className="rounded-t-4xl bg-white pt-5 pb-24 md:pb-5 sm:border-2 ">
             <div className='px-5'>
             <UserPreview 
                qr={true}
                name={userInfo?.firstName + " " + userInfo?.lastName}
                bio={myProfile?.bio}
                url={myProfile?.profileImage?.url}/>
             </div>
                <hr />
                <div className='mt-5  px-5'>
                <UserSetting />
                </div>
            </div>
        </div>
    )
}
export default SettingsPage
