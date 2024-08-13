import React from 'react'
import {CircleCheckBig} from "lucide-react"
import PageTitle from '../components/PageTitle/PageTitle'


function SortFilter() {
  return (
    <div className='    text-lg text-gray-700'> 
     {/* <section className='flex h- screen bg-pink-800 h-1/6 item-center justify-center'>
        <h1>Filter </h1>
        </section> */}
      <PageTitle  pageTitle={'Filter'}  />
        <div className=' bg-deep-plum '>
        <div className='h-fit py-4 px-5  bg-white rounded-t-3xl  ' > 
   
        <div class=" text-2xl mb-2 font-semibold">Sort By</div>
       
        <div className='flex justify-between mb-2 items-center '><h1 >Newest Member</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  flex justify-between mb-2 items-center "><h1>Last Active</h1><CircleCheckBig /></div> 
        <div className="border-t border-gray-200  flex justify-between mb-2 items-center"><h1>Distance</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  flex justify-between mb-2 items-center "><h1>Popularity</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  flex justify-between mb-2 items-center "><h1>Age</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  mb-2 "></div>

        <div className='text-2xl mb-2 font-semibold'><h1>Filter By</h1></div>
       
<div className='flex justify-between mb-2 items-center'><h1>Gender</h1> <CircleCheckBig /></div>
<div className="border-t border-gray-200  flex justify-between mb-2 items-center"><h1>Location</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  flex justify-between mb-2 items-center"><h1>Intrest\Hobbies</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  flex justify-between mb-2 items-center"><h1>Languages Spoken</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  flex justify-between mb-2 items-center"><h1>Relationship Goals</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200 mb-2 "></div>


<div className='flex space-x-6'>
<button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
  Cancel
</button>
<button class="bg-purple-500 hover:bg-deep-plum text-white font-bold py-2 px-4 rounded ">
  Apply
</button>
</div>



        </div>
        </div>
        </div>
  )
}

export default  SortFilter