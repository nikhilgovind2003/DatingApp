import React from 'react'
import { settingData } from '../../datas/userSettingData';
import { ArrowDownUp, Bell, CircleHelp, KeyRound, MessageCircleMore, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserSetting = () => {
  return (
    <div className='grid gap-5 px-6 sm:px-2 h-full lg:h-[63.5vh]'>
      {settingData?.map(item => (
        <Link to={item.link}
          key={item.title}
          className='flex items-center gap-5 text-[10px] sm:text-sm'>
          <div className='sm:w-14 sm:h-14 w-10 h-10 rounded-full bg-button-anti-flash-light grid place-items-center text-text-light'>
            {item.icon === "key" ?
              <KeyRound
                className='sm:w-8 sm:h-8 w-6 h-6 font-light'
                strokeWidth={1}
              />
              : item.icon === "chat" ? <MessageCircleMore
                className='sm:w-8 sm:h-8 w-6 h-6 font-light'
                strokeWidth={1}
              /> 
            : item.icon === "bell" ? <Bell
            className='sm:w-8 sm:h-8 w-6 h-6 font-light'
            strokeWidth={1}
          />
        : item.icon === "info" ? 
        <CircleHelp
        className='sm:w-8 sm:h-8 w-6 h-6 font-light'
        strokeWidth={1}
      />: item.icon === "database" ? 
      <ArrowDownUp
                className='sm:w-8 sm:h-8 w-6 h-6 font-light'
                strokeWidth={1}
              /> 
              : item.icon === "share" ?
              <UsersRound
                className='sm:w-8 sm:h-8 w-6 h-6 font-light'
                strokeWidth={1}
              />
            : ''}
          </div>
          <div>
            <h5 className='font-semibold text-text text-lg'>{item.title}</h5>
            <p className='text-text-light text-sm'>{item.setting}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UserSetting