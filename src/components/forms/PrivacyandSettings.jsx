import { useSelector } from "react-redux";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PrivacyAndSettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const toggleTwoFactorAuth = () => {
    setTwoFactorAuth(!twoFactorAuth);
  };

  const userinfo = useSelector((state) => state.userAuth.userInfo)
  const userEmail = userinfo?.email

  return (
    <div className="flex justify-center items-center  bg-deep-plum">
      <div className="bg-white p-6 rounded-t-3xl w-full ">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Privacy and Settings</h2> */}

        {/* Sign-in Email */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-gray-700 font-medium">Sign-in Email</span>
          <span className="text-gray-900">{userEmail?userEmail:"johnsmith@gmail.com"}</span>
        </div>

        {/* Password */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-gray-700 font-medium">Password</span>
          <a href="/change-password" className="text-blue-600 hover:underline">Change password</a>
        </div>

        {/* 2-FA Authentication */}
        <div className="mb-4 flex justify-between items-center">
          <span className="text-gray-700 font-medium">2-FA Authentication</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={toggleTwoFactorAuth}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:bg-deep-plum"></div>
            <div
              className={`absolute left-1 top-1 bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform ${
                twoFactorAuth ? 'translate-x-full border-white' : ''
              }`}
            ></div>
          </label>
        </div>

        {/* Phone Number */}
        <div className="mb-2 flex justify-between items-center hover:bg-gray-100 py-2">
          <span className="text-gray-700 font-medium">Phone Number</span>
          <span className="text-gray-900">+380 93 123 45 67</span>
        </div>

        {/* Partner Preference */}
        <Link to={'/partener_preferences'}>
        <div className="mb-4 hover:bg-gray-100 py-2">
          <span className="text-gray-700 font-medium">Partner Preference</span>
          {/* Add partner preference content here */}
        </div>
        </Link>

        {/* Last Sign In */}
        <div className="mb-6">
          <span className="text-gray-700 font-medium">Last Sign In</span>
          <p className="text-gray-900">Today at 18:34, Safari 198.123.23.23</p>
        </div>

        {/* Total Active Sessions */}
        <div className="mb-6">
          <span className="text-gray-700 font-medium">Total Active Sessions (5)</span>
          <ul className="text-gray-900 mt-2 space-y-4">
            <li>
              <strong>DESKTOP-6TIG6EC</strong> • Kyiv, Ukraine <br />
              Chrome • Used right now
            </li>
            <li>
              <strong>iPhone 11</strong> • Kyiv, Ukraine <br />
              Chrome • 04/19/2022
            </li>
            {/* Add other sessions if needed */}
          </ul>
        </div>

        {/* Reset Sessions Button */}
        <button
          type="button"
          className="w-full bg-deep-plum text-white py-2 rounded-full hover:bg-deep-plum transition duration-200"
        >
          Reset All Active Sessions
        </button>
      </div>
    </div>
  );
};

export default PrivacyAndSettings;