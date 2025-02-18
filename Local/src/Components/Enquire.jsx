import React from "react";
import Swal from "sweetalert2";

const Enquire = () => {
  const handleEnquire = () => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your enquiry has been submitted successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEnquire();
    form.reset();
  };

  return (
    <>
    <div className="absolute inset-0 bg-black bg-opacity-60 "></div>
      <div
        className="relative bg-cover bg-center bg-no-repeat  py-4 md:py-8 lg:py-10"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/pRPy3JJ/premium-photo-1689609949921-6b2529511e38.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          {/* Left Content */}
          <div className="text-white lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl text-blue-400 font-bold mb-4">
              Discover a new way of living
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Feugiat scriptaorem qui ea, quo admodum eloquentiam eu. Te malis
              tibique eum. Ne magna assum everti.
            </p>
          </div>
          {/* Right Form */}
          <div className="bg-white bg-opacity-70 pb-7 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Make an enquiry</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Your name*
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 bg-white bg-opacity-70"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Your email*
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 bg-white bg-opacity-70"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Your phone number*
                </label>
                <input
                  type="text"
                  name="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 bg-white bg-opacity-70"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-lime-700"
              >
                Make an enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquire;
