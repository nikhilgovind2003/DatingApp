import React from 'react'
import { House } from 'lucide-react';
import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Star } from 'lucide-react';
import { Search } from 'lucide-react';
const LeftBar = () => {
  return (
    <div className='w-full h-full bg-deep-plum text-white text-lg  pt-5'>
      <ul className='space-y-2'>
       <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2 flex items-center">
            <span className="mr-2"><House /></span>Home
          </a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2 flex items-center">
            <span className="mr-2"><Heart /></span>Likes
          </a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2 flex items-center">
            <span className="mr-2"><MessageCircle /></span>Messages
          </a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2 flex items-center">
            <span className="mr-2"><Star /></span>Favourites
          </a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2 flex items-center">
            <span className="mr-2"><Search /></span>Search
          </a>
        </li>
      </ul>
    </div>
  )
}

export default LeftBar