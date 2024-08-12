import React from 'react'
import { Button } from '@chakra-ui/react';

import { GoChevronRight } from "react-icons/go";
function Error404() {
    return (

    <div className=' content-around h-full bg-hot-purple text-white text-lg   min-h-screen  w-full m-auto '>
    <div className=' text-center font-Play text-4xl'>
       <h1 className=' text-center text-8xl text-yellow-200'>404</h1>

<p className='text-5xl'>Ooops... </p><br />
<p>We cannot find this page</p>

<br />

<Button  colorScheme='teal text-white' variant='outline'>
   Let's try something different <span ><GoChevronRight /></span>
 </Button>
       </div> 
     
   </div>
 )
}

export default Error404