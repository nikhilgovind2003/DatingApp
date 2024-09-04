import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const jobStatus = location.state?.jobStatus;
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        axios.post('http://localhost:5000/api/v1/users/job_details', data, { withCredentials: true })
            .then(res => {
                setLoading(false);
                toast.success(res.data.message, { duration: 1000 });
                if (res.data.success) {
                    if (jobStatus === 'employee' || jobStatus === 'employer') {
                        setTimeout(() => navigate('/more_job_details', { state: { jobStatus } }), 1000);
                    }
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.response.data.message, { duration: 1000 });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">
            <div className="flex justify-center items-center min-h-screen lg:w-2/5">
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
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="mb-5 text-2xl font-bold text-center">Job Details</h2>
                    <div className="mb-4">
                        <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            {...register('companyName', { required: 'Company Name is required' })}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.companyName ? 'border-red-500' : ''}`}
                        />
                        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="designation" className="block text-gray-700">Designation</label>
                        <input
                            type="text"
                            id="designation"
                            {...register('designation', { required: 'Designation is required' })}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.designation ? 'border-red-500' : ''}`}
                        />
                        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            {...register('location', { required: 'Location is required' })}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.location ? 'border-red-500' : ''}`}
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" disabled={loading} className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">{loading ? 'processing...' : 'Next'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobDetails;
