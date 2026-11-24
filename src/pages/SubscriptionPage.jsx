import React from 'react'
import { CircleCheck } from 'lucide-react';

function SubscriptionPage() {
  return (
    <div>
      <div className='bg-[#4b164c] h-screen'>
   <div className='text-center font-semibold text-2xl font-montserrat  p-8  text-white'>
    Subscription Plan
   </div>
   <div className='bg-gray-900 px-2 py-4   mx-auto tracking-wide h-screen rounded-t-4xl'>
   <div className="text-white flex justify-center  tracking-widest p-6   mx-auto  rounded-lg">
    <div>
        <h2 className="text-xl font-bold">Prime Member</h2>
        <p className="text-4xl font-extrabold mt-2">₹49<span className="text-lg font-medium">/-month</span></p>
    <div className='text-sm leading-2 '>
       <div className="mt-2  ">
          <span> </span>  <p className="font-semibold mb-2 flex items-center gap-2"><CircleCheck  />Daily Limits</p>
            <ul className="list-disc text-xs ml-14">
                <li>View up to 15 profiles per day</li>
                <li>Send up to 15 requests per day</li>
            </ul>
        </div>

        <div className="mt-2 border-t border-gray-700 pt-2">
            <p className="font-semibold mb-2 flex items-center gap-2"><CircleCheck  /> Weekly Limits</p>
            <ul className="list-disc text-xs ml-14 space-y-1">
                <li>View up to 80 profiles per week</li>
                <li>Send up to 80 requests per week</li>
            </ul>
        </div>

        <div className="mt-2 border-t border-gray-700 pt-2">
            <p className="font-semibold mb-2 flex items-center gap-2"> <CircleCheck  />  Monthly Limits</p>
            <ul className="list-disc text-xs ml-14 space-y-1">
                <li>View up to 300 profiles per month</li>
                <li>Send up to 300 requests per month</li>
            </ul>
        </div>

        <div className="mt-2 border-t border-gray-700 pt-2">
            <p className=" font-semibold mb-2 flex items-center gap-2"><CircleCheck  /> Premium Features</p>
            <ul className="list-disc text-xs ml-14 space-y-1">
                <li>Unlock Unlimited Messages</li>
                <li>Unlock Shortlist Page</li>
                <li>View Profiles Who Shortlisted You</li>
                <li>Sort & filter Profiles</li>
            </ul>
        </div>
        </div>
        </div>
    </div>
    <div className='text-gray-400 text-center'>
    <button onClick={() => window.location.href = '/paymentMethod'} className='px-16 py-4 bg-gray-600 rounded-2xl text-2xl font-bold' >Subscribe</button>
</div>
   </div>


      </div>
    </div>
  )
}

export default SubscriptionPage
