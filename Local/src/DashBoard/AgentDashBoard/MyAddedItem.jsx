import React from "react";
import agentsData from "../../Hooks/Agents/agentsData";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import ReusableTitle from "../../Components/ReusableTitle";
import { Zoom } from "react-awesome-reveal";

const MyAddedItem = () => {
  const [agentItem, isLoading, refetch] = agentsData();
  const axiosSecure = UseAxiosSecure();

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/deleteItem/${id}`).then((res) => {
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
    <>
    <ReusableTitle  title='My Added Properties' subtitle='Manage and track the properties you’ve listed'/>
      <div className="md:w-11/12 mx-auto">
        {/* Card */}
        <div>
          {agentItem.length === 0 ? (
            <div className="bg-lime-500 text-white p-6 rounded-lg w-2/4 mx-auto shadow-md border border-yellow-500">
              <h2 className="text-xl font-semibold ">No Items Found</h2>
              <p className="mt-2 ">
                You haven't added any properties yet. Please add one.
              </p>
              <Link to={"/dashboard/addProperty"}>
                <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors">
                  Add Item
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3  gap-4">
              {agentItem.map((property, index) => (
                <Zoom key={property.id} duration={1000} delay={index * 200}>
                  <div key={index} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img
                      className="h-40 lg:h-56 w-full object-cover"
                      src={property.image}
                      alt={property.name || "Property"}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg font-semibold">
                      {property.name}
                    </h2>
                    <p>Location: {property.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={property.sellerImage}
                        alt={property.agentName}
                      />
                      <p>Agent: {property.sellerName}</p>
                    </div>
                    <p>
                      <strong>Price Range:</strong> ${property.minPrice} - $
                      {property.maxPrice}
                    </p>
                    <p>
                      <strong>Verification Status:</strong>{" "}
                      <span
                        className={`badge ${
                          property.verification === "Verified"
                            ? "badge-success"
                            : property.verification === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {property.verification || "Pending"}
                      </span>
                    </p>
                    <div className="mt-4 flex gap-4">
                      {property.verification !== "Rejected" && (
                        <Link to={`/dashboard/updateProperty/${property._id}`}>
                          <button className="btn btn-primary btn-sm">
                            Update
                          </button>
                        </Link>
                      )}
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(property._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                </Zoom>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAddedItem;
