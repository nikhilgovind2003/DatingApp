import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = ({ children, isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return  children;
};

export default ProtectedRouter;