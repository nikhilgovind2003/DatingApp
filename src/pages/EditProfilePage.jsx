import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { ArrowLeft } from "lucide-react"; // Import the desired icon from lucide-react
import EditProfile from '../components/forms/EditProfile';

function EditprofilePage() {
    return (
        <div>
            <PageTitle icon={ArrowLeft} pageTitle="Edit Profile" />
            <EditProfile />
        </div>
    )
}

export default EditprofilePage
