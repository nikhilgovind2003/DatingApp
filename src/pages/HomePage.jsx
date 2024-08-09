import React from 'react'

import { HomeCard, LeftBar, RightBar } from '../Components'
import { Bell } from 'lucide-react'


const HomePage = () => {
  return (
    <div>
        <LeftBar />
        <h1>HomePage</h1>
      <RightBar />
      <HomeCard />
    </div>
  )
}

export default HomePage