import React from 'react';
import { Link } from 'react-router-dom';

const ButtonGroup = () => {
  return (
    <div className="w-full hidden lg:flex space-x-2 rounded-full bg-pink-100 p-1 justify-between gap-1 sm:gap-2 lg:gap-5 my-5">
      <Link to="/location" className='w-full'>
      <button className="px-2 py-2 sm:px-4 sm:py-2 w-full rounded-full text-gray-600 focus:bg-white focus:text-blue-500 font-medium text-sm sm:text-lg md:text-xs lg:text-lg transition-all">
        location
      </button>
      </Link>
      <Link to="/designation" className='w-full'>
      <button className="px-2 py-2 sm:px-4 sm:py-2 w-full rounded-full text-gray-600 focus:bg-white focus:text-blue-500 font-medium text-sm sm:text-lg md:text-xs lg:text-lg transition-all">
        Designation
      </button>
      </Link>
      <Link to="/qualification" className='w-full'>
      <button className="px-2 py-2 sm:px-4 sm:py-2 w-full rounded-full text-gray-600 focus:bg-white focus:text-blue-500 font-medium text-sm sm:text-lg md:text-xs lg:text-lg transition-all">
        Qualification
      </button>
      </Link>
    </div>
  );
};

export default ButtonGroup;
