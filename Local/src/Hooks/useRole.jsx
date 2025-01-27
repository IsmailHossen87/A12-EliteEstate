import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';

const useRole = () => {
    const axiosSecure = UseAxiosSecure()
    const {user}= useAuth()
    const {data:role='user' ,isLoading,refetch,isPending:isAdminLoading} = useQuery({
        queryKey:[user?.email,'userRole'],
        queryFn: async() =>{
          const res =  await axiosSecure(`/user/role/${user?.email}`)
      
          return res?.data.role
        }
    })
    return [role,isLoading,refetch,isAdminLoading]
};

export default useRole;