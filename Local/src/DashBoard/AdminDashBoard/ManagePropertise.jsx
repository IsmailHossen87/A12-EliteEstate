import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { MdCancel } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import Swal from "sweetalert2";

const ManagePropertise = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: buyerData = [], refetch } = useQuery({
    queryKey: ["buyersData"],
    queryFn: async () => {
      const { data } = await axiosSecure("/manageProperty");
      return data;
    },
  });

  const handleStatusChange = (userId, status) => {
    axiosSecure.patch("/status", { userId, status }).then((res) => {
      if (res.data.success) {
        Swal.fire("Success", `User has been updated to ${status}`, "success");
      }
      refetch();
    });
  };

  return (
    <>
      <div className="md:mx-5  rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                Title
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                Location
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                Agent Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                Email
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                PriceRange
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                Status
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                verify
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left">
                Rerect
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buyerData?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${item.location}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${item.sellerName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${item.sellerEmail}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  ${item.minPrice}-${item.maxPrice}
                </td>
                <td
                  className={`px-4 py-4 text-sm whitespace-nowrap ${
                    item.verification === "Rejected"
                      ? "text-red-500 font-bold"
                      : item.verification === "pending"
                      ? "text-blue-500 font-semibold"
                      : item.verification === "Verified"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {item.verification}
                </td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <button
                    disabled={
                      item.verification === "Rejected"
                    }
                    onClick={() => handleStatusChange(item._id, "Verified")}
                    className={`text-white rounded-[7px] p-1 hover:text-black text-3xl focus:outline-none ${
                      item.verification === "Verified"
                        ? "bg-green-500 opacity-50 cursor-not-allowed"
                        : item.verification === "Rejected"
                        ? "bg-red-500"
                        : item.verification === "pending"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <FcApprove />
                  </button>
                </td>

                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <button
                    disabled={
                      item.verification === "Rejected"
                    }
                    onClick={() => handleStatusChange(item._id, "Rejected")}
                    className={`text-white rounded-[7px] p-2 hover:text-black text-2xl focus:outline-none ${
                      item.verification === "Rejected"
                        ? "bg-red-500 opacity-50 cursor-not-allowed"
                        : item.verification === "Verified"
                        ? "bg-green-500"
                        : item.verification === "pending"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    <MdCancel />
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

export default ManagePropertise;
