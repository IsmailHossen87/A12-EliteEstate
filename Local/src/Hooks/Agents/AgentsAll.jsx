import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosPublic from "../useAxiosPublic";

const AgentsAll = (search) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const { data: agentAll = [], isPending } = useQuery({
      queryKey: ["agentAll", user?.email,search],
      queryFn: async () => {
        const { data } = await axiosPublic.get(search ? `/myAdded?search=${search}`: `/myAdded`);
        return data;
      }, 
    });
  
    return [agentAll, isPending];
  };
  
  export default AgentsAll