import React from 'react'

import { HomeCard, LeftBar, RightBar } from '../Components'
import { Bell } from 'lucide-react'
import SpinPage from './SpinPage/SpinPage'
import YourMatches from "./YourMatches"

const HomePage = () => {
  return (
    
    <div>
      {/* <SpinPage /> */}
      <YourMatches />
     </div>
   
    
  )
}

export default HomePage