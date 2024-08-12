import React from 'react'
import {CircleCheckBig} from "lucide-react"

function SortFilter() {
  return (
    <div className='    h-1/6 sm:12 md:p-14 lg:p-16 xl:p20 text-lg text-gray-700'> 
     {/* <section className='flex h- screen bg-pink-800 h-1/6 item-center justify-center'>
        <h1>Filter </h1>
        </section> */}
        <div>
        <div className=' h-screen mx-7 pt-2 pb-4 px-36 rounded-tl-lg rounded-br-lg  ' > 
   
        <div class=" md:text-4xl">Sort By</div>
        <br /><br /><br />
        <div className=' space-x-80'><h1 >Newest Member</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  space-x-80 "><h1>Last Active</h1><CircleCheckBig /></div>
        
        <div className="border-t border-gray-200  space-x-80"><h1>Distance</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  space-x-80 "><h1>Popularity</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  space-x-80 "><h1>Age</h1><CircleCheckBig /></div>
        <div className="border-t border-gray-200  "></div>
<br /><br /><br />
        <div className='md:text-4xl'><h1>Filter By</h1></div>
       
<br /><br /><br />
<div className='space-x-80'><h1>Gender</h1> <CircleCheckBig /></div>
<div className="border-t border-gray-200  space-x-80"><h1>Location</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  space-x-80"><h1>Intrest\Hobbies</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  space-x-80"><h1>Languages Spoken</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  space-x-80"><h1>Relationship Goals</h1><CircleCheckBig /></div>
<div className="border-t border-gray-200  "></div>
<br /><br /><br />

<div className='flex space-x-32'>
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