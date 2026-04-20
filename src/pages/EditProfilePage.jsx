import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { ArrowLeft } from "lucide-react"; // Import the desired icon from lucide-react
import EditProfile from '../components/forms/EditProfile';
import { useParams } from 'react-router-dom';

function EditprofilePage() {
    const { userId } = useParams();
    
    return (
        <div>
            <PageTitle icon={ArrowLeft} pageTitle="Edit Profile" linkTo={'/profile'} />
            <EditProfile />
        </div>
    )
}

export default EditprofilePage
