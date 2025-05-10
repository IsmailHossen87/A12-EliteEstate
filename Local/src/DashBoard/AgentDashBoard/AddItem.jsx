import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLandmark, FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axiosPublic.get("/usersData").then((res) => setUsersData(res.data));
  }, []);
  const isFraud = usersData.some((user) => user.status === "fraud");

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const { data: res } = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOSTING
      }`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.success) {
      const menuItem = {
        name: data.name,
        location: data.location,
        minPrice: parseInt(data.minPrice),
        maxPrice: parseInt(data.maxPrice),
        image: res.data.display_url,
        sellerName: user?.displayName,
        sellerEmail: user?.email,
        sellerImage: user?.photoURL,
        verification: "pending",
      };
      if (isFraud) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Because you are Fraud`,
        });
        reset();
      } else {
        const menuData = await axiosSecure.post("/agentAdd", menuItem);
        if (menuData.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/agentAdded");
        }
      }
    }
  };

  return (
    <div>
      <div className=" lg:py-10 py-0 sm:px-6 md:p-8 ">
        <div className="  mx-auto bg-blue-100 shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Add Property
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
                Upload Image
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 
                file:bg-gradient-to-r file:from-blue-500 file:to-lime-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg hover:file:bg-lime-600"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full md:w-2/5 lg:w-2/6 flex items-center justify-center px-4 py-3 text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-lg font-medium transition-all"
              >
                <FaLandmark className="mr-2" /> Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
