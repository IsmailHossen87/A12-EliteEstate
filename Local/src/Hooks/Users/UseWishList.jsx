import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosPublic from '../useAxiosPublic';
import UseAxiosSecure from '../UseAxiosSecure';

const UseWishList = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure()
    const { data: wishlist = [] ,refetch} = useQuery({
        queryKey: ['wishList', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/wishList/${user?.email}`);
            return data;
        }
    });
    return [wishlist,refetch]
};

export default UseWishList;