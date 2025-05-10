import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UseReviews from "../../Hooks/Users/UseReviews";
import ReusableTitle from "../../Components/ReusableTitle";
import StarRatings from "react-star-ratings";

const ReviewAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const [reviews, refetch] = UseReviews();

  const handleDelete = async (reviewId) => {
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
        axiosSecure.delete(`/reviewsDelete/${reviewId}`).then((res) => {
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
  };

  return (
    <div className="">
      <ReusableTitle
        title="All Reviews"
        subtitle="What our customers are saying"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4">
        {reviews.map((review) => (
          <div className="bg-blue-100 shadow-md grid grid-cols-4  rounded-lg p-4 ">
              {/* User Image */}
              <div className="col-span-1">
                <img
                  referrerPolicy="no-referrer"
                  src={review.userImage}
                  alt={review.user}
                  className="w-16 h-16 rounded-full mb-2"
                />
              </div>
              <div className="flex col-span-3  flex-col">
                <h2 className="text-lg flex  font-semibold">{review.user}</h2>
                {/* User Email */}
                <p className="text-sm text-gray-600">{review.email}</p>
              </div>
              {/* User Comment */}
              <div className=" col-span-4 grid mt-4 grid-cols-5 justify-between">
                <div className="col-span-3 border-2 px-4 py-1 border-gray-600 rounded-md  ">
                  <p className="">{review.comment}</p>
                </div> 
                 <div className="col-span-2 text-end">
                  <StarRatings
                rating={review.rating} 
                starRatedColor="blue" 
                starEmptyColor="gray"
                numberOfStars={5} 
                starDimension="23px"
                starSpacing="2px" 
              /> 
                 </div>
              </div>
              <button
                  onClick={() => handleDelete(review._id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAdmin;
