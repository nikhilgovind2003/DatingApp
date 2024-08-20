import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MoreJobDetails = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        console.log(data);
        axios.patch('http://localhost:5000/api/v1/users/more_job_details', data, {withCredentials: true})
        .then(res => {
            setLoading(false);
            toast.success(res.data.message, { duration: 1000 })
            if(res.data.success) {
                setTimeout(() => navigate('/more_job_details') ,1000) //change the path
            }
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.response.data.message, { duration: 1000 })
        })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
             <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="flex justify-center items-center min-h-screen p-4 lg:w-2/5">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="mb-5 text-2xl font-bold text-center">Job Details</h2>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            {...register('title', { required: 'Title is required' })}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errors.title ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="level" className="block text-gray-700">Expertise Level</label>
                        <select
                            id="level"
                            {...register('level', { required: 'Expertise Level is required' })}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errors.level ? 'border-red-500' : ''
                            }`}
                        >
                            <option value="" disabled selected>Select your level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                        {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">{loading ? 'processing...' : 'Next'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MoreJobDetails;
