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
            <div className="bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center">
              {/* User Image */}
              <img
                referrerPolicy="no-referrer"
                src={review.userImage}
                alt={review.user}
                className="w-16 h-16 rounded-full mb-2"
              />

              {/* User Name */}
              <h2 className="text-lg font-semibold">{review.user}</h2>

              {/* User Email */}
              <p className="text-sm text-gray-600">{review.email}</p>

              {/* User Comment */}
              <p className="mt-2 text-center">{review.comment}</p>
              <StarRatings
                rating={review.rating} 
                starRatedColor="blue" 
                starEmptyColor="gray"
                numberOfStars={5} 
                starDimension="23px"
                starSpacing="2px" 
              />
            </div>
          </Zoom>
        ))}
      </div>
    </div>
  );
};

export default LatestReview;
