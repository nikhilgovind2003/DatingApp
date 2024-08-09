import React from 'react'
import { LogOut } from 'lucide-react';

const RightBar = () => {
  return (
    <div className='w-1/6 h-screen bg-gray-700 text-white text-lg font-bold pt-5'>
      <ul className='space-y-2'>
        <li className="hover:bg-gray-500">
          <a href='#' className="block px-4 py-2">My Profile</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Sent Request</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Viewed My Profile</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Accept Request</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Reject</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Received</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Shortlisted By</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Shortlisted</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Contacted</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Message</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2">Settings</a>
        </li>
        <li className="hover:bg-gray-500">
          <a href="#" className="block px-4 py-2 flex items-center">
            <span className="mr-2"><LogOut /></span>Logout
          </a>
        </li>
      </ul>
    </div>
  )
}

export default RightBar;
