import { Button } from '@chakra-ui/react';
import React from 'react'
import { GoChevronRight } from "react-icons/go";

function Error403 () {

  return (
    <div className=' content-around h-full bg-hot-purple text-white text-lg   min-h-screen max-w-sm w-full m-auto '>
     <div className=' text-center font-Play text-4xl'>
        <h1 className=' text-center text-8xl text-yellow-200'>403</h1>
<p className='text-5xl'>Access Denied</p><br />
<p>Sorry , You don't </p>
<p>have access to</p>
<p>this page</p>
<br />

<Button  colorScheme='teal text-white' variant='outline'>
    Go back to the Previous page <span className='border-x-emerald-50'><GoChevronRight /></span>
  </Button>
        </div> 
      
    </div>
  )
}

export default   Error403;