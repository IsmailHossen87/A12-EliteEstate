import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UseWishList from "../../Hooks/Users/UseWishList";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import ReusableTitle from "../../Components/ReusableTitle";
import { Zoom } from "react-awesome-reveal";

const WishList = () => {
  const navigate = useNavigate();
  const [wishlist, refetch] = UseWishList();
  // const axiosPublic = useAxiosPublic();
  const axiosSecure=UseAxiosSecure()

  const handleRemove = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/wishList/${id}`).then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div>
    <ReusableTitle title='Your Wishlist' subtitle='Save your favorite properties for quick access anytime.' />
     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-4">
      {wishlist?.map((property,index) => (
       <Zoom key={property.id} duration={1000} delay={index * 200}>
         <div
          key={property.id}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          {/* Property Image */}
          <img
            src={property.image}
            alt={property.propertyName}
            className="w-full h-48 object-cover"
          />

          {/* Property Details */}
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {property.propertyTitle}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Location:</span>{" "}
              {property.location}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Price Range:</span> $
              {property.priceRange}
            </p>

            {/* Agent Details */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={property.SellerImage}
                alt={property.SellerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800 font-medium">
                  {property.SellerName}
                </p>
                <p
                  className={`text-sm ${
                    property.verifyStatus === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {property.verificationStatus === "pending"
                    ? "Pending Approval"
                    : "Verified Agent"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link to={`/dashboard/make-offer/${property._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Make an Offer
                </button>
              </Link>

              <button
                onClick={() => handleRemove(property._id)}
                className="bg-red-500 text-white px-4 py-2 rounhover:bg-red-600"
              >
                {" "}
                Remove{" "}
              </button>
            </div>
          </div>
        </div>
       </Zoom>
      ))}
    </div>
   </div>
  );
};

export default WishList;
