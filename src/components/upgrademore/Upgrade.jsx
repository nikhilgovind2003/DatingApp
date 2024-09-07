import React from 'react';
import { Link } from 'react-router-dom';

const Upgrade = () => {
    return (
        <div className='max-w-[21rem] px-8 mx-auto bg-white shadow-lg rounded-3xl overflow-hidden h-[35vh] flex flex-col justify-center items-center ' >
            <h1 className='text-[2.5rem] mt-0 flex flex-col justify-center items-center font-Play font-normal tracking-wide leading-none py-[2rem] '>
                Upgrade to<br/> view more
            </h1>
            <Link to={'/subscription'}>
            <a className='bg-deep-plum shadow-lg py-4 px-8 rounded-3xl text-white font-bold  w-[60%] '>Upgrade</a>
            </Link>
        </div>
    );
};

export default Upgrade;