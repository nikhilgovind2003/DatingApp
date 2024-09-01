import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRouter = ({ children }) => {
  const isAuthenticated = useSelector(state => state.userAuth.isAuthenticated);
  console.log('ProtectedRouter: isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return children; // Render children if authenticated
  } else {
    toast.error("Token Expired", { duration: 1000 });
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRouter;
