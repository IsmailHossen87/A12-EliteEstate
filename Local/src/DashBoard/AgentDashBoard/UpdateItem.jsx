import React, { useEffect, useState } from "react";
import { FaLandmark } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [propertyData, setPropertyData] = useState(null);
  const axiosPublic= useAxiosPublic()

  // Fetch existing property details
  useEffect(() => {
    axiosSecure
      .get(`/details/${id}`)
      .then((res) => {
        setPropertyData(res.data);
        reset(res.data); 
      })
      .catch((err) => console.error("Error fetching property:", err));
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = propertyData.image; 

      if ( typeof data?.image !== 'string' && data.image[0]) {
        const formData = new FormData();
        console.log(data.image[0])
        formData.append("image", data.image[0]);

        const { data: res } = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // If image upload is successful, update imageUrl
        if (res.success) {
          imageUrl = res.data.display_url;
        } else {
          throw new Error("Image upload failed.");
        }
      }
  
      // Prepare updated property data
      const updatedProperty = {
        name: data.name,
        location: data.location,
        minPrice: parseInt(data.minPrice),
        maxPrice: parseInt(data.maxPrice),
        image: imageUrl,
      };
  
      // Send PATCH request to update property
      const response = await axiosSecure.patch(`/updateData/${id}`, updatedProperty);
  
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Property updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/agentAdded");
      } else {
        Swal.fire({
          icon: "warning",
          title: "No changes were made!",
          text: "It seems like the data is already up-to-date.",
        });
      }
    } catch (error) {
      console.error("Error updating property:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed!",
        text: "Something went wrong while updating the property.",
      });
    }
  };
  
  if (!propertyData) {
    return (
      <div className="text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="md:w-3/5 lg:w-2/5 mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Property
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Property Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Title
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter property title"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Property Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="Enter property location"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {/* Minimum Price */}
              <input
                {...register("minPrice", { required: true })}
                type="text"
                placeholder="Min Price"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
              {/* Maximum Price */}
              <input
                {...register("maxPrice", { required: true })}
                type="text"
                placeholder="Max Price"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
              />
            </div>
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload New Image
            </label>
            <input
              type="file"
              {...register("image")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 file:bg-lime-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg hover:file:bg-lime-600"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 text-white bg-lime-500 hover:bg-lime-600 rounded-lg shadow-lg font-medium transition-all"
            >
              <FaLandmark className="mr-2" /> Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
