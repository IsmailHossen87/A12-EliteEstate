import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider/AuthProvier';

const useAuth = () => {
    const auth = useContext(AuthContext)|| {
        
    }
    return auth
};

export default useAuth;