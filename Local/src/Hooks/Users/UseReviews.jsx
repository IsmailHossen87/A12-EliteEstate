import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import UseAxiosSecure from '../UseAxiosSecure';

const UseReviews = (email) => {
    const axiosSecure = UseAxiosSecure();
    // const {user}= useAuth()

    const {data:reviews=[],refetch} = useQuery({
        queryKey:['reviews',email],
        queryFn:async()=>{
        const { data } = await axiosSecure.get(email?`/reviews?email=${email}`:`/reviews` )
        return data
        }
    })
    return [reviews,refetch]
};

export default UseReviews;