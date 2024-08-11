import React from 'react';

const SettingOption = ({ icon, title, description }) => {
  return (
    <div className="flex items-center py-3 px-4 hover:bg-gray-100 cursor-pointer">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gray-50 p-6 flex items-center">
        <img
          className="w-16 h-16 rounded-full"
          src="https://tse4.mm.bing.net/th?id=OIP.B7f8QMVsITQtdAfEt2Ji0gHaEK&pid=Api&P=0&h=180" // replace with actual profile image
          alt="Profile"
        />
        <div className="ml-4">
          <h1 className="text-xl font-semibold text-gray-900">Nazrul Islam</h1>
          <p className="text-gray-600">Never give up <span role="img" aria-label="flexed bicep">💪</span></p>
        </div>
        <div className="ml-auto">
          <button className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7l6 6-6 6m13-12h5m-5 6h2m-2 6h2"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings Options */}
      <div className="divide-y divide-gray-200">
        <SettingOption
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.003 0 3.667-1.794 3.667-4S14.003 3 12 3c-2.003 0-3.667 1.794-3.667 4s1.664 4 3.667 4zm-7 10.333V18c0-1.992 3.668-3.665 7-3.665 3.332 0 7 1.673 7 3.665v3.333H5z" /></svg>}
          title="Account"
          description="Privacy, security, change number"
        />
        <SettingOption
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10h.01M12 10h.01M17 10h.01M7 15h.01M12 15h.01M17 15h.01M5 6h14M5 18h14" /></svg>}
          title="Chat"
          description="Chat history, theme, wallpapers"
        />
        <SettingOption
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8V6a5 5 0 0110 0v2M5 8h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" /></svg>}
          title="Notifications"
          description="Messages, group and others"
        />
        <SettingOption
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 18.01l.01-.011M9 12l2 2 4-4M9 18.01l.01-.011M12 18.01l.01-.011M15 18.01l.01-.011M9 21h6" /></svg>}
          title="Help"
          description="Help center, contact us, privacy policy"
        />
        <SettingOption
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v8c0 1.05.82 2 2 2h4l3 3V5l-3 3H5c-1.18 0-2 .95-2 2zm13 3h4m-2-2v4m-4 0h2v-4m-6-4l1.91 5.79L17 11l-4.09 2.21L12 19" /></svg>}
          title="Storage and data"
          description="Network usage, storage usage"
        />
        <SettingOption
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l2 2 4-4M12 22a10 10 0 110-20 10 10 0 010 20z" /></svg>}
          title="Invite a friend"
          description=""
        />
      </div>
    </div>
  );
};

export default SettingsPage;
