import React from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { ChevronLeft } from 'lucide-react'
import { Userdata } from '../datas/Userdata'
import { UserPreview } from '../Components'
import { LiaHeartSolid } from "react-icons/lia";



export default function Messages() {
  return (
    <div className="bg-deep-plum h-screen overflow-y-auto">
      <PageTitle icon={ChevronLeft} pageTitle={"Messages"} />
      
      {/* Recent Matches Section */}
      <div className="px-10">
        <h2 className="font-Play text-lg font-medium text-white mb-4">Recent Matches</h2>
        <div className="flex overflow-x-auto space-x-5">
          {Userdata.map(user => (
            <div key={user.id} className="flex-shrink-0 relative">
              <img 
                src={user.img} 
                alt={`${user.firstName} ${user.lastName}`} 
                className="h-24 w-20 rounded-2xl object-cover border-2 border-deep-plum"
              />
              <div className="flex flex-col items-center justify-center absolute inset-0 bg-light-purple bg-opacity-50 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                <LiaHeartSolid color='#ffffff' size={24} /> 
                <p className='text-white font-Play font-medium mt-1'>{user.likes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Messages Section */}
      <div className="rounded-t-4xl bg-white pt-5 px-5 pb-24 md:pb-5 sm:border-2 border-deep-plum mt-6">
        {Userdata.filter(user => user.message).map(user => {
          const name = `${user.firstName} ${user.lastName}`;
          return (
            <UserPreview 
              key={user.id} 
              name={name} 
              url={user.img} 
              message={user.message} 
              messageText={user.messageText}
            />
          )
        })}
      </div>
    </div>
  )
}
