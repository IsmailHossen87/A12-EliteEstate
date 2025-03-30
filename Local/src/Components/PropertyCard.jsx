
import React from "react";
import { Link } from "react-router-dom";
import "../Components/Pro.css"
import "../Components/button.css"

import { MdOutlineInfo } from "react-icons/md";
import { Zoom } from "react-awesome-reveal";

const PropertyCard = ({property}) => {
  return (
   <Zoom>
     <div className=" card bg-base-100 border-dashed hover:bg-slate-300 mt-28 shadow-xl mx-2 transform transition-all duration-400 hover:scale-105" >
     <div className="relative w-11/12 mx-auto">
          <div className=" rounded-3xl mt-[-80px] overflow-hidden relative">
            <img
              src={property.image}
              alt=""
              className="w-full h-44 rounded-lg  hover:scale-125 transition-all duration-300"
            />
          </div>
        </div>
            <div className="card-body -mt-5 px-1 md:px-4">
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
                <span className="font-semibold price-tag">Price Range :</span> $
                {property.minPrice} - ${property.maxPrice}
              </p>
              <div className="w-full">
                <Link to={`/details/${property._id}`}>
                  <button className="w-full proCardButton justify-center items-center  gap-5 flex">
                  Details
                    <MdOutlineInfo/>
                  </button>
                </Link>
              </div>
            </div>
    </div>
   </Zoom>
  );
};

export default PropertyCard;