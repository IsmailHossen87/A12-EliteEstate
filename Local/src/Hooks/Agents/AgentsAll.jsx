// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../useAuth";
// import useAxiosPublic from "../useAxiosPublic";

// const AgentsAll = (search,sort) => {
//     const { user } = useAuth();
//     const axiosPublic = useAxiosPublic();
    
//     const { data: agentAll = [], isPending } = useQuery({
//       queryKey: ["agentAll", user?.email,search],
//       queryFn: async () => {
//         const { data } = await axiosPublic.get(search ? `/myAdded?search=${search}`: `/myAdded`);
//         return data;
//       }, 
//     });
  
//     return [agentAll, isPending];
//   };
  
//   export default AgentsAll

import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosPublic from "../useAxiosPublic";

const AgentsAll = (search, sort) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const { data: agentAll = [], isPending } = useQuery({
      queryKey: ["agentAll", user?.email, search, sort],
      queryFn: async () => {
        // Construct query parameters dynamically
        let queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (sort) queryParams.append("sort", sort);

        const url = `/myAdded?${queryParams.toString()}`;
        const { data } = await axiosPublic.get(url);
        return data;
      }, 
    });

    return [agentAll, isPending];
};

export default AgentsAll;
