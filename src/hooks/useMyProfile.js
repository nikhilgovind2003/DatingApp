import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@/apiConfig';
import { setProfileData } from '../redux/features/auth/authSlice';
import { getSafeCookie } from '../utils/cookieHelper';

const useMyProfile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, myProfile: reduxProfile } = useSelector(state => state.userAuth);
  const cookieProfile = getSafeCookie('myProfile');
  const myProfile = reduxProfile || cookieProfile;

  useEffect(() => {
    if (isAuthenticated && !myProfile) {
      axios
        .get(`${API_URL}/users/get-profile`, { withCredentials: true })
        .then(({ data }) => dispatch(setProfileData(data.profileDetails || data)))
        .catch(console.error);
    }
  }, [isAuthenticated, myProfile, dispatch]);

  return myProfile;
};

export default useMyProfile;
