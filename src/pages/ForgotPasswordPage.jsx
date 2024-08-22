import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        // console.log(data);
        axios.post('http://localhost:5000/forgot-password', data)
        .then(res => {
            setLoading(false);
            toast.success(res.data.message, { duration: 1000 })
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.response.data.message || err, { duration: 1000 })
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
                    <h2 className="mb-5 text-2xl font-bold text-center">Forgot Password</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'email is required' })}
                            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">{loading ? 'processing...' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
