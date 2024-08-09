import React from 'react'
import UserIcon from './UserIcon'
import { QrCode } from 'lucide-react'

const UserPreview = ({url, name, bio, edit, qr}) => {
  return (
    <div
    className='py-4 flex items-center justify-between w-72'>
      <div className='flex gap-5 items-center'>
      <UserIcon 
      url={url}
      edit={edit}/>
      <div>
      <p className='text-text font-semibold text-2xl'>{name}</p>
      <p className='text-text-light text-sm'>{bio}</p>
      </div>
      </div>
      {qr ? <QrCode className='w-6 h-6 text-[#24786d]'/>
      : ''}
    </div>
  )
}

export default UserPreview