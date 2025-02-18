import moment from "moment";
import UseReviews from "../../Hooks/Users/UseReviews";
import Swal from 'sweetalert2'
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import ReusableTitle from "../../Components/ReusableTitle";
import { Zoom } from "react-awesome-reveal";
import StarRatings from "react-star-ratings";

const MyReviews = () => {
  const {user}= useAuth()
  const [reviews,refetch] = UseReviews(user?.email);

  const axiosSecure = UseAxiosSecure()
  const handleDeleteReview = async (id) => {
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
        axiosSecure.delete(`/reviewsDelete/${id}`)
        .then((res) => {
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

  if (reviews.length === 0) {
    return <p>You haven't added any reviews yet!</p>;
  }

  return (
   <>
   <ReusableTitle  title='Your Reviews' subtitle='Manage your shared feedback'/>
    <div className="container mx-auto py-2">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {reviews.map((review,index) => (
         <Zoom key={review.id} duration={1000} delay={index * 200}>
           <div key={review._id} className="px-2 py-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              {review.propertyTitle}
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Agent Name:</span>{" "}
              {review.agentName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Reviewed On:</span>{" "}
              {moment(review.addedAt).format("MMMM Do YYYY, h:mm A")}
            </p>
            <p className="text-gray-600 mt-2">{review.comment}</p>
         <div className="flex items-center  justify-between">
           <div>
           <button
              onClick={() => handleDeleteReview(review._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
            >
              Delete Review
            </button>
           </div>
           <div>
           <StarRatings
                rating={review.rating} 
                starRatedColor="blue" 
                starEmptyColor="gray"
                numberOfStars={5} 
                starDimension="20px"
                starSpacing="2px" 
              />
           </div>
         </div>
          </div>
         </Zoom>
        ))}
      </div>
    </div>
   </>
  );
};

export default MyReviews;
