import React from 'react'
import { House } from 'lucide-react';
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Star } from 'lucide-react';
import { Search } from 'lucide-react';
import Sidemenu from '../SideMenu/Sidemenu';
const LeftBar = () => {
  return (
    <div className='w-full h-full bg-hot-purple text-white text-lg sm:text-sm md:text-sm lg:text-lg pt-5'>
     <div>
     <Sidemenu />
      </div>
      <ul className='space-y-2'>
       <li className="hover:bg-dark-wine">
          <a href="" className=" px-4 py-2 flex items-center">
            <span className="mr-2"><House /></span>Home
          </a>
        </li>
        <li className="hover:bg-dark-wine">
          <a href="#" className=" px-4 py-2 flex items-center">
            <span className="mr-2"><Heart /></span>Likes
          </a>
        </li>
        <li className="hover:bg-dark-wine">
          <a href="#" className=" px-4 py-2 flex items-center">
            <span className="mr-2"><MessageCircle /></span>Messages
          </a>
        </li>
        <li className="hover:bg-dark-wine">
          <a href="#" className=" px-4 py-2 flex items-center">
            <span className="mr-2"><Star /></span>Favourites
          </a>
        </li>
        <li className="hover:bg-dark-wine">
          <a href="#" className=" px-4 py-2 flex items-center">
            <span className="mr-2"><Search /></span>Search
          </a>
        </li>
      </ul>
    </div>
  )
}

export default LeftBar