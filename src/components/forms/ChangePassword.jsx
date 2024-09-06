import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'New password must be at least 8 characters long')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    setLoading(true);
    axios.patch('http://localhost:5000/change-password', {
      password: data.currentPassword,
      newPassword: data.newPassword
    }, {
      withCredentials: true})
      .then(res => {
        setLoading(false);
        toast.success(res.data.message, { duration: 1000 });
        if (res.data.success) {
          setTimeout(() => navigate('/settings'), 1000);
        }
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response.data.message || err.message, { duration: 1000 });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-deep-plum">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-t-3xl w-full">
        <h2 className="text-lg text-gray-700 mb-4">
          Feeling worried about your account being easily preyed on? Then change that password now!
        </h2>

        {/* Current Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('currentPassword')}
              className="w-full px-4 py-2 border-b-2 border-purple-800 text-gray-700 focus:outline-none"
            />
            {errors.currentPassword && <p className="text-red-600 text-sm">{errors.currentPassword.message}</p>}
            <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    showPassword
                      ? 'M15 12m-3 0a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm1.5-6l-.992 1.168m0 9.664L12 18m8.485-8.485C21.345 9.68 23 12 23 12s-1.655 2.32-2.515 3.485m-5.045-5.045C15 9 12 9 12 9s-3 0-3.939 1.94M12 21l-.992-1.168m-7.05-7.05C2.655 14.32 1 12 1 12s1.655-2.32 2.515-3.485'
                      : 'M12 19c3.866 0 7-4.478 7-7s-3.134-7-7-7S5 8.478 5 11s3.134 7 7 7z'
                  }
                />
              </svg>
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword')}
              className="w-full px-4 py-2 border-b-2 border-purple-800 text-gray-700 focus:outline-none"
            />
            {errors.newPassword && <p className="text-red-600 text-sm">{errors.newPassword.message}</p>}
            <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    showPassword
                      ? 'M15 12m-3 0a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm1.5-6l-.992 1.168m0 9.664L12 18m8.485-8.485C21.345 9.68 23 12 23 12s-1.655 2.32-2.515 3.485m-5.045-5.045C15 9 12 9 12 9s-3 0-3.939 1.94M12 21l-.992-1.168m-7.05-7.05C2.655 14.32 1 12 1 12s1.655-2.32 2.515-3.485'
                      : 'M12 19c3.866 0 7-4.478 7-7s-3.134-7-7-7S5 8.478 5 11s3.134 7 7 7z'
                  }
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="w-full px-4 py-2 border-b-2 border-purple-800 text-gray-700 focus:outline-none"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
            <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    showPassword
                      ? 'M15 12m-3 0a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm1.5-6l-.992 1.168m0 9.664L12 18m8.485-8.485C21.345 9.68 23 12 23 12s-1.655 2.32-2.515 3.485m-5.045-5.045C15 9 12 9 12 9s-3 0-3.939 1.94M12 21l-.992-1.168m-7.05-7.05C2.655 14.32 1 12 1 12s1.655-2.32 2.515-3.485'
                      : 'M12 19c3.866 0 7-4.478 7-7s-3.134-7-7-7S5 8.478 5 11s3.134 7 7 7z'
                  }
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-deep-plum text-white py-2 rounded-full hover:bg-purple-900 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
