import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosPublic from "../useAxiosPublic";

const agentsData = () => {
    const {user} = useAuth()
    // TOdO CONFIUSED
    const axiosPublic = useAxiosPublic()
    const {data:agentItem=[],isLoading,refetch}= useQuery({
        queryKey:['agent',user?.email],
        queryFn:async()=>{
            const {data}=await axiosPublic.get(`/myAdded/${user?.email}`)
            return data
        }   
    })
    return [agentItem,isLoading,refetch];
};

export default agentsData;