import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { ChevronLeft } from 'lucide-react'
import { Userdata } from '../datas/Userdata'
import { UserPreview } from '../Components'


export default function Messages() {
  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
        <PageTitle icon={ChevronLeft} pageTitle={"Messages"}/>
        <div className="rounded-t-4xl bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum ">
        {Userdata.filter(user => user.message).map(user => {
            const name = user.firstName + " " + user.lastName;
           return (
            <UserPreview name={name} url={user.img} message={user.message}/>
           )
        })}
      </div>
    </div>
  )
}
