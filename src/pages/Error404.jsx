import React from 'react';
import { Button } from '@chakra-ui/react';
import { GoChevronRight } from "react-icons/go";

function Error404() {
    return (

        <div className='content-around h-full min-h-screen w-full m-auto bg-hot-purple text-white md:text-lg overflow-y-auto'>
            <div className='text-center font-Play text-4xl'>
                <h1 className='text-center text-5xl md:text-8xl text-yellow-200'>404</h1>
                <p className='text-xl md:text-5xl'>Ooops...</p><br />
                <p className='md:text-5xl text-xl'>We cannot find this page</p>
                <br />
                <Button colorScheme='teal' variant='outline'>
                    Let's try something different <span><GoChevronRight /></span>
                </Button>
            </div>
        </div>
    );

}

export default Error404;
