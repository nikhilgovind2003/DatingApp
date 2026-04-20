import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  Cigarette,
  Beer,
  ChevronLeft,
  Mail,
  Phone,
  User,
  MapPin,
  Activity,
  Heart
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/apiConfig';
import { getIconForInterest } from "../datas/Interesticon";
import Button from '../components/buttons/InterestButton';
import { setProfileData } from '../redux/features/auth/authSlice';

function MyProfile() {
  const dispatch = useDispatch();
  const authState = useSelector(state => state?.userAuth || state.auth || {});


  
  const userInfo = authState.userInfo;
  console.log("userInfo", userInfo)
  const reduxProfile = authState.myProfile;
  const [fetchedLocation, setFetchedLocation] = useState(null);

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/get-profile`, {
          withCredentials: true,
        });
        dispatch(setProfileData(data.profileDetails || data));
      } catch (error) {
        console.error("Error fetching latest profile from API:", error);
      }
    };
    
    fetchLatestProfile();
  }, [dispatch]);

  const myProfile = reduxProfile?.profileDetails ? reduxProfile.profileDetails : (reduxProfile || {
    _id: null,
    age: '',
    gender: '',
    location: '',
    bio: '',
    hobbies: '',
    interests: [],
    drinking: '',
    smoking: '',
    qualification: '',
    profileImage: { url: '' },
    bannerImage: { url: '' }
  });


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.state || "Current Location";
              setFetchedLocation(city);
            }
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Address location possibly being an object or string
  const displayLocation = typeof myProfile?.location === 'object' 
    ? myProfile?.location?.place 
    : myProfile?.location;

  const finalLocation = displayLocation || fetchedLocation || 'Location not set';

  // Calculate Profile Completion
  const completionFields = [
    userInfo?.firstName,
    userInfo?.lastName,
    userInfo?.email,
    userInfo?.contact,
    myProfile?.age,
    myProfile?.gender,
    finalLocation !== 'Location not set' ? finalLocation : null,
    myProfile?.bio,
    myProfile?.interests && myProfile.interests.length > 0 ? myProfile.interests : null,
    myProfile?.hobbies,
    myProfile?.smoking,
    myProfile?.drinking,
    myProfile?.qualification,
    myProfile?.profileImage?.url
  ];

  const filledFieldsCount = completionFields.filter(
    field => field && (typeof field === 'string' ? field.trim() !== '' : true)
  ).length;

  const completionPercentage = Math.round((filledFieldsCount / completionFields.length) * 100) || 0;

  return (
    <div>
      <div className="container relative h-screen overflow-y-auto w-full mx-auto bg-gray-50">
        <div
          className="h-[75vh] overflow-hidden sticky top-0 "
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(128, 0, 128, 0.8)), url("${myProfile?.bannerImage?.url || myProfile?.profileImage?.url || 'fallbackImage.jpg'}") `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="topnavigation flex p-2 sticky top-6 justify-between">
            <Link to="/home">
              <div className="rounded-full backdrop-filter backdrop-blur-sm bg-opacity-45 border-2 w-fit border-white p-2 text-white transition hover:bg-white/20">
                <ChevronLeft />
              </div>
            </Link>
            <div className="rounded-full flex border-2 w-fit backdrop-filter backdrop-blur-sm bg-opacity-45 border-white py-2 px-6 text-white font-medium transition hover:bg-white/20">
              <Link to="/editprofile"><span>Edit</span></Link>
            </div>
          </div>

          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 p-2 flex-wrap justify-center items-center w-full">
            <div className="text-center">
              <span className="text-4xl font-extrabold text-white text-center drop-shadow-md">
                {userInfo?.firstName && userInfo?.lastName
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : 'No Name Provided'}
                {myProfile?.age ? `, ${myProfile.age}` : ''}
              </span> <br />
              <span className="text-lg text-gray-200 flex items-center justify-center gap-1 mt-2 drop-shadow-sm font-medium">
                <MapPin className="w-5 h-5" /> {finalLocation}
              </span>
            </div>
            <div className="text-white text-center py-2 mt-6">
              <span className="inline-flex items-center pl-1 bg-white/20 backdrop-blur-md py-2 rounded-full border border-white/40 shadow-lg">
                <span className="rounded-full border-4 border-white text-sm font-bold w-12 h-12 flex items-center justify-center bg-purple-600">
                  {completionPercentage}%
                </span>
                <span className='px-4 font-semibold tracking-wide'>Profile Complete</span>
              </span>
            </div>
          </div>
        </div>

        <div className="profiledetails cursor-pointer min-h-screen shadow-2xl p-8 bg-white rounded-t-[40px] relative" style={{ marginTop: '-120px', zIndex: '50' }}>
          <div className="bg-gray-300 rounded-full mx-auto mb-8" style={{ width: '64px', height: '6px' }}>
          </div>
          <div className="overflow-y-auto pb-20 space-y-8">
            
            {/* About Section */}
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <span className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-2 block object-left">About Me</span>
              <p className="font-medium text-gray-700 leading-relaxed">
                {myProfile?.bio || 'This user has not added a bio yet.'}
              </p>
            </div>

            {/* Basic Info */}
            <div>
              <span className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 block">Basic Information</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><User className="w-4 h-4" /></div>
                    <span className="font-medium text-gray-500">Gender</span> 
                  </div>
                  <span className="font-semibold text-gray-800">{myProfile?.gender || 'Not specified'}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Activity className="w-4 h-4" /></div>
                    <span className="font-medium text-gray-500">Age</span> 
                  </div>
                <span className="font-semibold text-gray-800">{myProfile?.age || 'Not specified'}</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Mail className="w-4 h-4" /></div>
                    <span className="font-medium text-gray-500">Email</span> 
                  </div>
                  <span className="font-semibold text-gray-800 max-w-[150px] truncate">{userInfo?.email || 'Not provided'}</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Phone className="w-4 h-4" /></div>
                    <span className="font-medium text-gray-500">Mobile</span> 
                  </div>
                  <span className="font-semibold text-gray-800">{userInfo?.contact || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Hobbies Section */}
            <div>
              <span className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 block">Hobbies</span>
              <div className="flex items-center gap-3 mt-2 text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <Heart className="w-5 h-5 text-rose-500" />
                <span className="font-semibold text-gray-800">{myProfile?.hobbies || 'No hobbies listed'}</span>
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <span className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 block">Interests</span>
              <div className="flex flex-wrap gap-3">
                {myProfile?.interests && myProfile?.interests?.length > 0 && myProfile.interests[0] !== '' ? (
                  myProfile.interests[0].split(',').map((interest, index) => (
                    <div key={index} className="transform hover:scale-105 transition-transform duration-200">
                      <Button
                        text={interest.trim()}
                        icon={getIconForInterest(interest.trim())}
                        initialSelected={false}
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 italic font-medium px-2">No interests selected</span>
                )}
              </div>
            </div>

            {/* Smoking & Drinking Section */}
            <div>
              <span className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 block">Lifestyle Preferences</span>
              <div className="flex flex-wrap gap-4 text-purple-800">
                <div className="border border-purple-200 bg-purple-50/80 shadow-sm flex items-center gap-3 px-5 py-3 rounded-xl font-bold transition hover:bg-purple-100">
                  <Beer className="w-5 h-5 text-amber-600" /> 
                  <span className="text-gray-700">{myProfile?.drinking ? myProfile.drinking : 'Not specified'}</span>
                </div>
                <div className="border border-purple-200 bg-purple-50/80 shadow-sm flex items-center gap-3 px-5 py-3 rounded-xl font-bold transition hover:bg-purple-100">
                  <Cigarette className="w-5 h-5 text-slate-500" /> 
                  <span className="text-gray-700">{myProfile?.smoking ? myProfile.smoking : 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* Qualification Section */}
            <div>
              <span className="text-purple-600 text-xs font-bold uppercase tracking-widest mb-4 block">Qualification</span>
              <div className="border border-purple-200 bg-purple-50/80 shadow-sm w-fit flex text-purple-800 items-center gap-3 px-5 py-3 rounded-xl font-bold transition hover:bg-purple-100">
                <GraduationCap className="w-6 h-6 text-purple-600" /> 
                <span className="text-gray-700 capitalize">{myProfile?.qualification || 'No qualification listed'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
