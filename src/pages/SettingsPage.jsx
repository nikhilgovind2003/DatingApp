import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { Search } from "lucide-react";
import { UserPreview, UserSetting } from '../components';
import { useSelector } from 'react-redux';
import { getSafeCookie } from '../utils/cookieHelper';

function SettingsPage() {

    const userInfo = useSelector(state => state.userAuth.userInfo);

    const myProfile = getSafeCookie('myProfile') || { bio: '', profileImage: { url: null } };
    console.log(myProfile);

    return (
        <div className="bg-deep-plum h-screen overflow-y-auto">
            <PageTitle icon={Search} pageTitle={"Settings"} />
            <div className="rounded-t-4xl bg-white pt-5 pb-24 md:pb-5 sm:border-2 ">
                <div className='px-5'>
                    <UserPreview
                        qr={true}
                        name={userInfo?.firstName + " " + userInfo?.lastName}
                        bio={myProfile?.bio}
                        url={myProfile?.profileImage?.url} />
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
