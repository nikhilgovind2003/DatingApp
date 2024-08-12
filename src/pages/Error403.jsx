import { Button } from '@chakra-ui/react';
import React from 'react'
import { GoChevronRight } from "react-icons/go";

function Error403 () {

  return (
    <div className=' content-around h-full bg-hot-purple text-white md:text-lg   min-h-screen w-full m-auto overflow-y-auto'>
     <div className=' text-center font-Play text-2xl md:text-4xl'>
        <h1 className=' text-center text-5xl md:text-8xl text-yellow-200'>403</h1>
<p className='md:text-5xl text-xl'>Access Denied</p><br />
<p className='text-sm md:text-2xl'>Sorry , You don't </p>
<p className='text-sm md:text-2xl'>have access to</p>
<p className='text-sm md:text-2xl'>this page</p>
<br />

<Button  colorScheme='teal text-white' variant='outline'>
    Go back to the Previous page <span className='border-x-emerald-50'><GoChevronRight /></span>
  </Button>
        </div> 
      
    </div>
  )
}

export default   Error403;