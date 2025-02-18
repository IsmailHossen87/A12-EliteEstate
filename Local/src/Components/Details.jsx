
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useRole from "../Hooks/useRole";
import StarRatings from "react-star-ratings";

const Details = () => {
  const { id } = useParams(); 
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient()
  const [newReview, setNewReview] = useState(""); 
  const navigate = useNavigate()
  const [rating,setRating]= useState(3)

  const [role]= useRole()
 

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axiosSecure.get(`/details/${id}`);
      setDetails(data);
    };

    const fetchReviews = async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
      setReviews(data);
    };

    fetchDetails();
    fetchReviews();
  }, [id, axiosPublic]);

  const handleAddToWishlist = async (details) => {
    if (role !== 'user') {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Only users add to the wishlist.",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/')
      return
    }

    const BuyerEmail = user?.email;
    const BuyerName = user?.displayName;
    const wishListData = {
      propertyId: details._id,
      propertyTitle: details.name,
      SellerImage: details.sellerImage,
      SellerName: details.sellerName,
      sellerEmail:details.sellerEmail,
      location: details.location,
      priceRange: `${details.minPrice}-${details.maxPrice}`,
      minPrice: details.minPrice,
      maxPrice: details.maxPrice,
      image: details.image,
      verifyStatus: "Pending",
      BuyerEmail,
      BuyerName,
      addedAt: new Date().toISOString(),
    };
    const res = await axiosSecure.post("/wishList", wishListData);
    if (res.data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      queryClient.invalidateQueries({ queryKey: ['wishList',user?.email] })
      navigate('/dashboard/WishList')
    }
  };

  const handleAddReview = async () => {
    if (!newReview.trim()) {
      alert("Please enter a review.");
      return;
    }
    if(rating === 0){
      Swal.fire('Please select a rating')
      return;
    }
    const reviewData = {
      propertyId: id,
      user: user?.displayName,
      userImage:user?.photoURL,
      email:user?.email,
      agentName:details?.sellerName,
      comment: newReview,
      propertyTitle:details?.name,
      rating,
      addedAt: new Date().toISOString(),
    };
    const res = await axiosSecure.post(`/reviews`, reviewData);
    if (res.data.insertedId) {
      Swal.fire(`Review added successfully for ${details?.name}`);
      setReviews([...reviews, reviewData]); 
      setNewReview(""); 
      setRating(0)
      setIsModalOpen(false); 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full h-80 md:w-1/3">
          <img
            src={details?.image}
            alt={details?.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3 p-6">
          {/* Seller Details */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Seller Information
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={details?.sellerImage}
                alt={details?.sellerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-800 font-medium">
                  {details?.sellerName}
                </p>
                <p className="text-gray-600 text-sm">{details?.sellerEmail}</p>
                <p
                  className={`text-sm ${
                    details?.sellerStatus === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {details?.sellerStatus === "pending"
                    ? "Pending Approval"
                    : "Approved Seller"}
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {details?.name}
          </h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Location:</span> {details?.location}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Price Range:</span> $
            {details?.minPrice} - ${details?.maxPrice}
          </p>

            <button
              onClick={() => handleAddToWishlist(details)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              Add to Wishlist
            </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded shadow">
                <p className="text-gray-800 font-medium">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
                <StarRatings
                rating={review.rating} 
                starRatedColor="blue" 
                starEmptyColor="gray"
                numberOfStars={5} 
                starDimension="23px"
                starSpacing="2px" 
              />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No reviews yet.</p>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
        >
          Add a Review
        </button>
      </div>

      {/* Modal for Adding Review */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Add Your Review
            </h3>
            {/* rating */}
            

            <textarea
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
              rows="4"
              placeholder="Write your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-green-500"
                  onChange={() => setRating(star)}
                  checked={rating === star}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Details;
