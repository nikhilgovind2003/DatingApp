import React from 'react';

const Upgrade = () => {
    return (
        <div className='max-w-[21rem] mx-auto bg-white shadow-lg rounded-3xl overflow-hidden h-[35vh] flex flex-col justify-center  items-center ' >
            <h1 className='text-[2.5rem]  flex flex-col justify-center items-center font-Play font-normal tracking-wide leading-none pt-[4rem] pb-[2rem] '>
                Upgrade to<br/> view more
            </h1>
            <button className='bg-deep-plum shadow-lg rounded-3xl text-white font-bold py-[1rem] w-[60%] '>Upgrade</button>
          
        </div>
    );
};

export default Upgrade;