import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState({});
  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [disable, setDisable] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const { data } = await axiosSecure.get(`/offer/${id}`);
        setOffer(data);
      } catch (error) {
        console.error("Error fetching offer details:", error);
      }
    };
    fetchOffer();
  }, [id, axiosPublic]);

  const handleOfferSubmit = (e) => {
    e.preventDefault();

    if (!buyingDate) {
      Swal.fire({
        icon: "error",
        title: "Buying Date Required",
        text: "Please select a buying date.",
      });
      return;
    }

    if (offerAmount < offer.minPrice || offerAmount > offer.maxPrice) {
      Swal.fire({
        icon: "error",
        title: "Invalid Offer Amount",
        text: `Offer amount must be between ${offer.minPrice} and ${offer.maxPrice}.`,
      });
      return;
    }

    const status = "Pending";
    const title = offer.propertyTitle;
    const location = offer.location;
    const BuyerEmail = offer.BuyerEmail;
    const BuyerName =offer.BuyerName
    const image = offer.image
    const SellerName =offer?.SellerName
    const sellerEmail = offer.sellerEmail

    const offersData = { status, offerAmount, buyingDate,title,location,BuyerEmail,BuyerName ,image,SellerName,sellerEmail};
    axiosSecure.post("/offer", offersData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${offer.propertyTitle} offer has been saved`,
          showConfirmButton: false,
          timer: 1500,
        });
        setDisable(true);
        navigate('/dashboard/propertyBought')
      }
    });
  };

  return (
    <div className="w-9/12 mx-auto  p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Make an Offer</h1>
      <form className="space-y-4" onSubmit={handleOfferSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Property Title:</label>
          <input
            type="text"
            value={offer.propertyTitle || ""}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">
            Property Location:
          </label>
          <input
            type="text"
            value={offer.location || ""}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Agent Name:</label>
          <input
            type="text"
            value={offer.SellerName || ""}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Buyer Email:</label>
          <input
            type="email"
            value={offer.BuyerEmail || ""}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Buyer Name:</label>
          <input
            type="text"
            value={offer.BuyerName || ""}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Offer Amount:</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            placeholder={`Enter amount between ${offer.minPrice || "min"} and ${
              offer.maxPrice || "max"
            }`}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Buying Date:</label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={disable}
          className={`w-full py-2 rounded transition ${
            disable
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default Offer;
