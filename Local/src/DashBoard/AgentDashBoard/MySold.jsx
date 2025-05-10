import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import ReusableTitle from "../../Components/ReusableTitle";

const MySold = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/paymentHistory/${user?.email}`);
      return data;
    },
  });
  const totalSoldPrice = paymentHistory.reduce((total, item) => {
    return total + (item.soldPrice || 0); d
  }, 0);

  return (
    <>
    <ReusableTitle  title='My Sold Properties' subtitle="Track the properties you’ve successfully sold"/>
    <p className="text-sm mt-2">
          <strong>Total Sold Price:</strong> ${totalSoldPrice.toFixed(2)}
        </p>
      <div className="md:mx-5 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left ">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Property Titel
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Location
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Buyer Email
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left ">
                Sold Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentHistory.map((item, index) => (
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
                  {item.buyerEmail}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {item.soldPrice}$
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MySold;

