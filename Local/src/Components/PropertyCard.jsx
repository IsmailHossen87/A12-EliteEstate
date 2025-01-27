
import React from "react";
import { Link } from "react-router-dom";

import { MdOutlineInfo } from "react-icons/md";
import { Zoom } from "react-awesome-reveal";

const PropertyCard = ({property}) => {
  return (
   <Zoom>
     <div className="card bg-base-100 shadow-xl mx-2 transform transition-transform duration-400 hover:scale-105" >
            <figure>
              <img
                src={property.image}
                className="h-48 w-full object-cover"
                alt={property.title}
              />
            </figure>
            <div className="card-body px-1 md:px-4">
              <h2 className="card-title">{property.name}</h2>
              <p className="pt-0">Location: {property.location}</p>
              <div className="flex items-center gap-4">
                <img
                  src={property.sellerImage}
                  alt={property.sellerName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full"
                />
                <span>{property.sellerName}</span>
              </div>
              <p>
                <span className="font-semibold ">Verification Status: </span>
             <span className="badge-success text-white px-2 rounded-md">   {property.verification}</span>
              </p>
              <p>
                <span className="font-semibold">Price Range:</span> $
                {property.minPrice} - ${property.maxPrice}
              </p>
              <div className="w-full">
                <Link to={`/details/${property._id}`}>
                  <button className="btn btn-primary mt-4 w-full flex items-center justify-center gap-2">
                    <MdOutlineInfo className="text-xl" />
                    Details
                  </button>
                </Link>
              </div>
            </div>
    </div>
   </Zoom>
  );
};

export default PropertyCard;