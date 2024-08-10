import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import { Search } from 'lucide-react'
import { UserPreview } from '../../Components';

function Sent() {
  return (
    <div className='bg-deep-plum'>
      <PageTitle icon={Search} pageTitle={"Sent"} />
      <div className='rounded-t-4xl bg-white pt-14' >
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
        <UserPreview name={"Afrin Sabilla"} bio={"Life is not beautifull"} close={true} />
      </div>
    </div>
  );
}

export default Sent