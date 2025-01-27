import React from 'react';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {

    const {user,loading}= useAuth()
    const location = useLocation()

    const [role,,,isAdminLoading]=useRole()
    if (loading || isAdminLoading) {
        return (
          <div className="text-center">
            <span className="loading loading-spinner bg-red-500 loading-lg "></span>
          </div>
        );
      }

      if (user && role) {
        return children;
      }
      return <Navigate state={{from:location}} replace to="/login"/>

};

export default AdminRoute;