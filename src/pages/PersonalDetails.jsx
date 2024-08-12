import React from 'react';
import { ImagePlus } from 'lucide-react';
import { FileVideo } from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalDetails = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
        <div className="flex flex-col min-h-screen  p-4 lg:w-2/5">
            <div className="bg-white p-6 mt-14 mb-10 rounded-lg shadow-lg w-full max-w-md mx-auto ">
                <h2 className="mb-5 text-2xl font-bold text-center">Personal Details</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700">DOB</label>
                    <input type="date" id="dob" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="hobbies" className="block text-gray-700">Hobbies</label>
                    <input type="text" id="hobbies" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="interests" className="block text-gray-700">Interests</label>
                    <input type="text" id="interests" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="smoking" className="block text-gray-700">Smoking Habits</label>
                    <input type="text" id="smoking" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="drinking" className="block text-gray-700">Drinking Habits</label>
                    <input type="text" id="drinking" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="qualifications" className="block text-gray-700">Qualifications</label>
                    <input type="text" id="qualifications" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                <label htmlFor="profile_pic" className="flex items-center text-black">Profile Pic <ImagePlus className="ml-2" /></label>
                    <input type="file" id="profile_pic" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="more_images" className="flex items-center text-black">Add More Images <ImagePlus className="ml-2" /></label>
                    <input type="file" id="more_images" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="reel" className="flex items-center text-black">Short Reel <FileVideo className="ml-2"/></label>
                    <input type="file" id="reel" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                </div>
                
                <div className="flex justify-center">
                    <Link className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 t text-center" to="/job_status">Next</Link>
                </div>
            </div>
        </div>
        </div>
    );
}

export default PersonalDetails;
