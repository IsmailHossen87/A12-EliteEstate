import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdDelete } from "react-icons/md";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FcAcceptDatabase } from "react-icons/fc";
import Swal from "sweetalert2";
import ReusableTitle from "../../Components/ReusableTitle";
import useAuth from "../../Hooks/useAuth";

const Requested = () => {
  const axiosSecure = UseAxiosSecure();
  const {user}= useAuth()
  const { data: soldItem = [], refetch } = useQuery({
    queryKey: ["sold"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/agent/${user?.email}`);
      return data;
    },
  });
  
  // status change when uder offer and see the item and approve
  const handleStatus = (userId, status) => {
    axiosSecure.patch("/requestAccept", { userId, status }).then((res) => {
      if (res.data.success) {
        Swal.fire("Success", `User has been updated to ${status}`, "success");
      }
      refetch();
    });
  };
  return (
   <>
   <ReusableTitle  title="Property Offers" subtitle="Review and manage offers from potential buyers."/>
    <div className="md:mx-5 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
              No
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Title
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Location
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Email
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Name
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Offer Price
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Status
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Accept
            </th>
            <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Reject
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {soldItem.map((item, index) => (
            <tr key={item._id}>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.title}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.location}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.BuyerEmail}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.BuyerName}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                ${item.offerAmount}
              </td>
              <td
                className={`px-4 py-4 text-sm whitespace-nowrap ${
                  item.status === "Rejected"
                    ? "text-red-500 font-bold"
                    : item.status === "Pending"
                    ? "text-blue-500 font-semibold"
                    : item.status === "Accepted"
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                {item.status}
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <button
                disabled={item.status !== "Pending"}
                  onClick={() => handleStatus(item._id, "Accepted")}
                  className={`text-2xl focus:outline-none px-2 py-2 rounded-lg ${
                    item.status === "Accepted"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-green-500 hover:text-white"
                  }`}
                >
                  <FcAcceptDatabase></FcAcceptDatabase>
                </button>
              </td>
              <td className="px-4 py-4 text-sm whitespace-nowrap">
                <button
                 disabled={item.status !== "Pending"}
                  onClick={() => handleStatus(item._id, "Rejected")}
                  className={`text-2xl focus:outline-none px-2 py-2 rounded-lg ${
                    item.status === "Rejected"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <MdDelete></MdDelete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </>
  );
};

export default Requested;
