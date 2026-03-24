import React, { useState } from "react";
import { KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { login, signup } from "../redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { API_URL } from "../apiConfig";


import { signUpSchema } from "../utils/validationSchemas";

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const google = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  const validate = () => {
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOtpGeneration = async () => {
    if (!formData.email) {
      toast.error("Please enter email first");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users/generateotp`, {
        email: formData.email,
      });
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent successfully.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error generating OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const registrationResponse = await axios.post(`${API_URL}/users/register`, {
          ...formData
        }, { withCredentials: true });

        if (registrationResponse.data.success) {
          toast.success(registrationResponse.data.message || "Registered successfully!");
          const userCookie = Cookies.get('user');
          const token = Cookies.get('token');
          if (userCookie && token) {
            const decodedUserCookie = decodeURIComponent(userCookie);
            const cleanedUserJson = decodedUserCookie.startsWith('j:') ? decodedUserCookie.slice(2) : decodedUserCookie;
            const user = JSON.parse(cleanedUserJson);

            const payload = {
              userInfo: user,
              isAuthenticated: true,
              token
            };
            dispatch(login(payload));
          }
          setTimeout(() => {
            navigate('/personal_details');
          }, 2000);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred during registration.");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed backdrop-blur-3xl">

        <div className="bg-white mt-14 mb-10  p-8 rounded-lg shadow-2xl w-full md:w- max-w-md">
          <ToastContainer />
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                FirstName
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Value"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.FirstName && (
                <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                LastName
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Value"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Value"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Value"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Value"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Value"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700">
                OTP
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Value"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                />
                <button
                  type="button"
                  className="ml-2 px-3 py-2 bg-black text-white rounded-lg  hover:bg-gray-600 flex items-center"
                  onClick={handleOtpGeneration}
                >
                  <KeyRound className="mr-2" />
                  Generate OTP
                </button>
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-600"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={google} className="w-full py-2 bg-dark-violet text-white rounded-lg hover:bg-gray-600">
              Social Media Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="#"
              className="text-sm text-blue-500 hover:underline"
              to="/login"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
