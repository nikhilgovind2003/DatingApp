import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
});

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const user = searchParams.get('user');
    const token = searchParams.get('token');
    console.log(user, token);

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const togglePasswordVisibility = () => setVisible(!visible);
    const toggleConfirmPasswordVisibility = () => setConfirmVisible(!confirmVisible);

    const onSubmit = (data) => {
        setLoading(true);
        console.log(data);
        axios.patch(`http://localhost:5000/reset-password?user=${user}&token=${token}`, data)
            .then(res => {
                setLoading(false);
                toast.success(res.data.message, { duration: 1000 });
                if (res.data.success) {
                    setTimeout(() => navigate('/login'), 1000); //change the path
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error(err.response?.data?.message || err.message, { duration: 1000 });
            });
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
                    <h2 className="mb-5 text-2xl font-bold text-center">Reset Password</h2>

                    <div className="mb-4">
                        <div className='relative'>
                            <label htmlFor="password" className="block text-gray-700">New Password</label>
                            <input
                                type={visible ? 'text' : 'password'}
                                id="password"
                                {...register('password')}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? 'border-red-500' : ''
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-4 bottom-2"
                                onClick={togglePasswordVisibility}
                            >
                                {visible ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4">
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                            <input
                                type={confirmVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                {...register('confirmPassword')}
                                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : ''
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-4 bottom-2"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmVisible ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-center">
                            {loading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
