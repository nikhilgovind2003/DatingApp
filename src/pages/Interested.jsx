import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Interested = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
        <div className="flex justify-center items-center min-h-screen p-4 lg:w-2/5 ">
            <div className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="mb-5 text-2xl font-bold text-center">Interested</h2>
                <div className="mb-4 flex justify-center">
                    <span onClick={() => navigate('/dating_interest')} className="w-full py-2 mb-2 bg-black text-white rounded-lg hover:bg-gray-500 text-center">Dating</span>
                </div>
                <div className="mb-4 flex justify-center">
                    <Link to='/matrimony' className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-500 text-center">Matrimony</Link>
                </div>
            </div>
        </div>
        </div>
    );s
}

export default Interested;
