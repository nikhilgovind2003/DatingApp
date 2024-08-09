import React from 'react'
import { settingData } from '../datas/userSettingData';
import { ArrowDownUp, Bell, CircleHelp, KeyRound, MessageCircleMore, UsersRound } from 'lucide-react';

const UserSetting = () => {
  return (
    <div className='grid gap-5'>
      {settingData?.map(item => (
        <div
          key={item.title}
          className='flex items-center gap-5'>
          <div className='w-14 h-14 rounded-full bg-button-anti-flash-light grid place-items-center text-text-light'>
            {item.icon === "key" ?
              <KeyRound
                className='w-8 h-8 font-light'
                strokeWidth={1}
              />
              : item.icon === "chat" ? <MessageCircleMore
                className='w-8 h-8 font-light'
                strokeWidth={1}
              /> 
            : item.icon === "bell" ? <Bell
            className='w-8 h-8 font-light'
            strokeWidth={1}
          />
        : item.icon === "info" ? 
        <CircleHelp
        className='w-8 h-8 font-light'
        strokeWidth={1}
      />: item.icon === "database" ? 
      <ArrowDownUp
                className='w-8 h-8 font-light'
                strokeWidth={1}
              /> 
              : item.icon === "share" ?
              <UsersRound
                className='w-8 h-8 font-light'
                strokeWidth={1}
              />
            : ''}
          </div>
          <div>
            <h5 className='font-semibold text-text text-lg'>{item.title}</h5>
            <p className='text-text-light text-sm'>{item.setting}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserSetting