import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import React from 'react'

const InteractionIcon = () => {
  return (
    <div className="flex gap-5 py-5 ps-5">
      <div>
        <div className='w-16 h-16 border-[3px] border-light-purple rounded-full p-0.5 relative'>
          <div className='w-full h-full rounded-full overflow-hidden'>
            <img
              src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user icon"
              className="w-full h-full object-cover blur-[3px]"
            />
            <FaHeart
              className='w-6 h-6 absolute top-[1.2rem] left-[1rem] text-white'
            />
          </div>
          <p
            className="text-text mt-1 font-medium flex gap-1"
          >
            Likes
            <span
              className="text-light-purple font-medium">
              32
            </span>
          </p>
        </div>
      </div>
      <div>
      <div className='w-16 h-16 border-[3px] border-light-purple rounded-full p-0.5 relative'>
        <div className='w-full h-full rounded-full overflow-hidden'>
          <img
            src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user icon"
            className="w-full h-full object-cover blur-[3px]"
          />
          <TbMessageCircle2Filled
            className='w-6 h-6 absolute top-[1.2rem] left-[1rem] text-white'
          />
        </div>
        <p
          className="text-text mt-1 font-medium flex gap-1"
        >
          Connect
          <span
            className="text-light-purple font-medium">
            15
          </span>
        </p>
      </div>
      </div>
    </div>
  )
}

export default InteractionIcon
