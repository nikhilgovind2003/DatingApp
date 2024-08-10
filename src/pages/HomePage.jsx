import React from 'react'

import { HomeCard, LeftBar, RightBar, UserPreview } from '../Components'
import { Bell } from 'lucide-react'
import PageTitle from '../components/PageTitle/PageTitle'


const HomePage = () => {
  return (
    <>
      <PageTitle icon={Bell} pageTitle={"Settings"} />
      <UserPreview />
    </>
  );
}

export default HomePage