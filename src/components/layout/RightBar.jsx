import React from 'react';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navData } from '../../datas/navData';

const RightBar = () => {
  return (
    <div className='w-full h-screen bg-hot-purple text-white text-lg sm:text-sm md:text-sm lg:text-lg pt-2'>
      {/* Profile Section */}
      <div className="flex flex-col items-center ">
        <div className="relative">
          {/* Profile Picture */}
          <img
            src="https://via.placeholder.com/100" // Replace with the actual profile picture URL
            alt="Profile"
            className="rounded-full w-12 h-12 object-cover"
          />
          {/* Online Indicator */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-hot-purple"></span>
        </div>
        <div className="text-center mt-3">
          <h2 className="font-bold text-lg">Stone Stellar</h2>
          <p className="text-sm text-green-300">Prime Member</p>
          <p className="text-sm text-green-300">Online</p>
        </div>
      </div>

      {/* Menu Items */}
      
      <div className=' overflow-y-auto py-5' style={{height:'550px' }}>
        <ul className='space-y-2'>
          {navData?.map(item => (
            <Link to={item.href} key={item.title}>
            <li className="hover:bg-dark-wine  px-4 py-2">
            {item.title}
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RightBar;
