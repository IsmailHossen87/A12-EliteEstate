import React from "react";
import UseReviews from "../Hooks/Users/UseReviews";
import ReusableTitle from "./ReusableTitle";
import { Zoom } from "react-awesome-reveal";
import StarRatings from "react-star-ratings";

const LatestReview = () => {
  const [reviews] = UseReviews();
  const rebiewsLimit = reviews.slice(0, 3); // Limiting reviews to the first 3

  return (
    <div className="p-4 mx-auto px-6 sm:px-10 py-10 lg:px-20">
      {/* Title Component */}
      <ReusableTitle
        title="Latest Reviews"
        subtitle="Insights from users who found their dream property"
      />

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rebiewsLimit.map((review, index) => (
          <Zoom key={review.id} duration={1000} delay={index * 300}>
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
                <div className="col-span-3 border-2 px-4 py-1 border-gray-600 rounded-md max-h-24 overflow-y-auto">
                  <p className="text-sm">{review.comment}</p>
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
            </div>
          </Zoom>
        ))}
      </div>
    </div>
  );
};

export default LatestReview;
