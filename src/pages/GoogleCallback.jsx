import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SOCKET_URL } from '@/apiConfig';
import { login } from '../redux/features/auth/authSlice';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const dest = searchParams.get('dest') || 'home';

  useEffect(() => {
    axios
      .get(`${SOCKET_URL}/auth/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(login({
          isAuthenticated: true,
          userInfo: data.user,
          token: data.token,
        }));
        navigate(`/${dest}`, { replace: true });
      })
      .catch(() => {
        navigate('/login?error=auth_failed', { replace: true });
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Signing you in...</p>
    </div>
  );
};

export default GoogleCallback;
