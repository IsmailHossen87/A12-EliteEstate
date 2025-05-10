import React from "react";
import AgentsAll from "../../Hooks/Agents/AgentsAll";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AdvertiseSection = () => {
    const axiosPublic =useAxiosPublic()
  const [agentAll] = AgentsAll();
  const verifiedProperties = agentAll?.filter(
    (verify) => verify.verification === "Verified"
  );

  const handleAdvertise =(id)=>{
    axiosPublic.patch(`/advertise/${id}`)
    .then(res =>{
        if(res.data.modifiedCount){
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your item Advertise saved",
                showConfirmButton: false,
                timer: 1000
              });
        }
    })
  }
  return (
    <div className="overflow-x-auto rounded-lg mx-auto">
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-100 ">
          <tr>
            <th className="py-3.5 px-4 text-sm font-normal text-left ">
              No
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left ">
              Item Image
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left ">
              Title
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left ">
              Price Range
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left ">
              AgentName
            </th>
            {/* agent name dekhate hobee */}
            <th className="px-4 py-3.5 text-sm font-normal text-left ">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {verifiedProperties.map((item, index) => (
            <tr key={item._id}>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-full w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
               ${item.minPrice}- ${item.maxPrice}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
               {item.sellerEmail}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
               {
                item.advertise == true ?  <button
                className="btn  bg-red-500  text-xl focus:outline-none"
              >
                Advertise
              </button> :  <button
                  onClick={() => handleAdvertise(item._id)}
                  className="btn  bg-green-500  text-xl focus:outline-none"
                >
                  Advertise
                </button>
               }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseSection;
