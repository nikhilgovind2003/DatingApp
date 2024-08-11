import React from 'react'
import { X , Star ,Heart,MessageCircle} from 'lucide-react';

function ProfileActionbar() {
  return (
    <div>
      <div className='shadow-lg p-2 w-fit mx-auto  text-lg rounded-full  flex backdrop-blur-lg bg-white/30 justify-center gap-8 ' >
        <div className='p-3 cursor-pointer bg-[#E108084D] rounded-full'>
      <X fill="#111" className='text-white ' />
      </div>
      <div className='p-3 cursor-pointer bg-[#4B164C] rounded-full'>
      <Star fill="white" strokeWidth={0}  />
      </div>
      <div className='p-3 cursor-pointer bg-[#DD88CF] rounded-full'>
      <Heart fill='white' strokeWidth={0} />      
      </div>
      <div className='p-3 cursor-pointer bg-[#e7a5dc] rounded-full'>
      <MessageCircle fill='white' strokeWidth={0} />      
      </div>
      </div>
    </div>
  )
}

export default ProfileActionbar
