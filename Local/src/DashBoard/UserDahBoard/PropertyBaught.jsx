import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useNavigate } from 'react-router-dom';
import ReusableTitle from '../../Components/ReusableTitle';
import { Zoom } from 'react-awesome-reveal';
import useAuth from '../../Hooks/useAuth';

const PropertyBought = () => {
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const {user}= useAuth()

    // Fetching data using React Query
    const { data: BuyItems = [] } = useQuery({
        queryKey: ['BuyItems'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/SoldItem/${user.email}`);
            return data;
        }
    });
    // Handle Payment Button Click
    const handlePay = (item) => {
        navigate(`/dashboard/payment/${item._id}`, {
            state: {
                amount: item.offerAmount,
                title: item.title, 
                location:item.location ,
                sellerEmail:item.sellerEmail,
                sellsId:item._id
            },
        });
    };

    return (
       <div>
        <ReusableTitle  title='Properties You Own'  subtitle="View details of the properties you've acquired"/>
        <div className="container mx-auto md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BuyItems.map((item, index) => (
          <Zoom key={item.id} duration={1000} delay={index * 200}>
            <div className="border rounded shadow p-4 bg-white">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-xl">Agent:</span>{" "}
                {item.SellerName}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-xl">Offered Amount:</span> $
                {item.offerAmount}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-xl">Location:</span>{" "}
                {item.location}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold text-xl">Status:</span>{" "}
                {item.status}
              </p>

              {item.transsectionId ? (
                <p className="text-green-400 font-semibold">
                  <span className="font-bold text-xl text-orange-400">
                    Transaction ID:
                  </span>{" "}
                  {item.transsectionId}
                </p>
              ) : (
                item.status === "Accepted" && (
                  <button
                    onClick={() => handlePay(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Pay
                  </button>
                )
              )}
            </div>
          </Zoom>
        ))}
      </div>
    </div>
       </div>
    );
};

export default PropertyBought;
