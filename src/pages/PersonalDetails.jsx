import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ImagePlus, FileVideo } from 'lucide-react';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    dob: yup.date().required('Date of Birth is required'),
    hobbies: yup.string().required('Hobbies are required'),
    interests: yup.string().required('Interests are required'),
    smoking: yup.string().required('Smoking habits are required'),
    drinking: yup.string().required('Drinking habits are required'),
    qualifications: yup.string().required('Qualifications are required'),
    profile_pic: yup.mixed().required('Profile picture is required'),
    more_images: yup.mixed().required('More images are required'),
    reel: yup.mixed().required('Short reel is required'),
});

const PersonalDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
            <div className="flex flex-col min-h-screen  p-4 lg:w-2/5">
                <div className="bg-white p-6 mt-14 mb-10 rounded-lg shadow-lg w-full max-w-md mx-auto ">
                    <h2 className="mb-5 text-2xl font-bold text-center">Personal Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input type="text" id="name" {...register('name')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700">DOB</label>
                            <input type="date" id="dob" {...register('dob')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.dob && <p className="text-red-600">{errors.dob.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="hobbies" className="block text-gray-700">Hobbies</label>
                            <input type="text" id="hobbies" {...register('hobbies')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.hobbies && <p className="text-red-600">{errors.hobbies.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="interests" className="block text-gray-700">Interests</label>
                            <input type="text" id="interests" {...register('interests')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.interests && <p className="text-red-600">{errors.interests.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="smoking" className="block text-gray-700">Smoking Habits</label>
                            <input type="text" id="smoking" {...register('smoking')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.smoking && <p className="text-red-600">{errors.smoking.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="drinking" className="block text-gray-700">Drinking Habits</label>
                            <input type="text" id="drinking" {...register('drinking')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.drinking && <p className="text-red-600">{errors.drinking.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="qualifications" className="block text-gray-700">Qualifications</label>
                            <input type="text" id="qualifications" {...register('qualifications')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.qualifications && <p className="text-red-600">{errors.qualifications.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="profile_pic" className="flex items-center text-black">Profile Pic <ImagePlus className="ml-2" /></label>
                            <input type="file" id="profile_pic" {...register('profile_pic')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.profile_pic && <p className="text-red-600">{errors.profile_pic.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="more_images" className="flex items-center text-black">Add More Images <ImagePlus className="ml-2" /></label>
                            <input type="file" id="more_images" {...register('more_images')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.more_images && <p className="text-red-600">{errors.more_images.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="reel" className="flex items-center text-black">Short Reel <FileVideo className="ml-2" /></label>
                            <input type="file" id="reel" {...register('reel')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm" />
                            {errors.reel && <p className="text-red-600">{errors.reel.message}</p>}
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetails;
