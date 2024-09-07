import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { ArrowLeft } from "lucide-react"; // Import the desired icon from lucide-react
import ChangePassword from '../components/forms/ChangePassword';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePwdPage() {
  return (
    <div>
      <ToastContainer
                position="top-right"
                autoClose={5000}
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
      <PageTitle icon={ArrowLeft} pageTitle="Change Password"/>
      <ChangePassword/>
    </div>
  )
}

export default ChangePwdPage
