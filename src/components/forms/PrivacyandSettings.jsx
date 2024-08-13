import React, { useState } from 'react';

const PrivacyandSettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const toggleTwoFactorAuth = () => {
    setTwoFactorAuth(!twoFactorAuth);
  };

  return (
    <div className="flex justify-center items-center h-fit  bg-deep-plum">
      <div className="bg-white p-4 px-6 rounded-t-3xl   w-full">
        <div className="mb-2 flex justify-between  ">
          <h3 className="text-lg text-gray-700 mb-2">Sign-in Email</h3>
          <p className="text-gray-900">johnsmith@gmail.com</p>
        </div>

        <div className="mb-2 flex justify-between">
          <h3 className="text-lg text-gray-700 mb-2">Password</h3>
          <a href="#" className="text-blue-600">Change password</a>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg text-gray-700">2-FA authentication</h3>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={toggleTwoFactorAuth}
              className="hidden"
            />
            <div
              className={`relative w-10 h-6 rounded-full ${
                twoFactorAuth ? 'bg-deep-plum' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                  twoFactorAuth ? 'transform translate-x-4' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>

        <div className="mb-2 flex justify-between">
          <h3 className="text-lg text-gray-700 mb-2">Phone number</h3>
          <p className="text-gray-900">+380 93 123 45 67</p>
        </div>

        <div className="mb-2">
          <h3 className="text-lg text-gray-700 mb-2">Partner Preference</h3>
        </div>

        <div className="mb-2">
          <h3 className="text-lg text-gray-700 mb-2">Last sign in</h3>
          <p className="text-gray-900">today at 18:34, Safari 198.123.23.23</p>
        </div>

        <div className="mb-2">
          <h3 className="text-lg text-gray-700 mb-2">Total active sessions (5)</h3>
          <ul className="text-gray-900">
            <li>DESKTOP-6TIG6EC • Kyiv, Ukraine <br /> Chrome • Used right now</li>
            <li className="mt-4">iPhone 11 • Kyiv, Ukraine <br /> Chrome • 04/19/2022</li>
          </ul>
        </div>

        <button
          type="button"
          className="w-full bg-deep-plum text-white py-2 rounded-full hover:bg-purple-900 transition duration-200"
        >
          + Reset all active sessions
        </button>
      </div>
    </div>
  );
};

export default PrivacyandSettings;
