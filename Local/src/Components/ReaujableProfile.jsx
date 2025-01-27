import React from 'react';
import useRole from '../Hooks/useRole';
import Profile from '../Context/PrivateRoute/Profile/Profile';

const ReaujableProfile = () => {
    const [role]= useRole()
    return (
        <div>
          <Profile role={role}></Profile>
        </div>
    );
};

export default ReaujableProfile;