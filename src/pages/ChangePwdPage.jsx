import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { ArrowLeft } from "lucide-react"; // Import the desired icon from lucide-react
import ChangePassword from '../components/forms/ChangePassword';

function ChangePwdPage() {
  return (
    <div>
      <PageTitle icon={ArrowLeft} pageTitle="Change Password"/>
      <ChangePassword/>
    </div>
  )
}

export default ChangePwdPage
