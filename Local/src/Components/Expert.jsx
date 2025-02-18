import React from 'react';
import taypingImage from '../assets/typingd.avif';
import discussImage from '../assets/discusswebp.webp';
import roomImage from '../assets/roomavif.avif';
import { MdFormatPaint, MdMapsHomeWork } from 'react-icons/md';
import { SiAffinitydesigner } from "react-icons/si";
import { Slide, Zoom } from 'react-awesome-reveal';

const Expert = () => {
  return (
    <div className=" py-16 px-6 sm:px-10 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Content */}
   
       <div className="lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold  mb-6 text-center lg:text-left">
            Our expert will help you <span className="">make the renovation</span>
          </h2>
          <div className="space-y-6">
           <Slide>
           <div className="flex items-start">
              <div className="text-blue-600 flex items-center justify-center text-5xl mr-4">
                <MdMapsHomeWork />
              </div>
              <div>
                <h3 className="text-xl font-semibold ">Find inspiration</h3>
                <p className=" text-sm">
                  Explore unique ideas to make your property stand out. Get inspired by the latest trends in real estate design.
                </p>
              </div>
            </div>
           </Slide>
            <Zoom>
            <div className="flex items-start">
              <div className="text-blue-600 flex items-center justify-center text-5xl mr-4">
                <SiAffinitydesigner />
              </div>
              <div>
                <h3 className="text-xl font-semibold ">Find architect/designer</h3>
                <p className=" text-sm">
                  Connect with skilled professionals who can bring your ideas to life with precision and creativity.
                </p>
              </div>
            </div>
            </Zoom>
            <Slide direction='right'>
            <div className="flex items-start">
              <div className="text-blue-600 flex items-center justify-center text-5xl mr-4">
                <MdFormatPaint />
              </div>
              <div>
                <h3 className="text-xl font-semibold ">Begin renovation</h3>
                <p className=" text-sm">
                  Start your renovation journey with our trusted team and transform your property with ease.
                </p>
              </div>
            </div>
            </Slide>
          </div>
        </div>
     

        {/* Right Images */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pl-16 flex">
          {/* Left Single Large Image */}
          <div className="w-1/2 pr-4">
            <img
              src={taypingImage}
              alt="Inspiration"
              className="w-full h-full rounded-lg shadow-md object-cover "
            />
          </div>
          {/* Right Two Stacked Images */}
          <div className="w-1/2 flex flex-col space-y-4">
            <img
              src={roomImage}
              alt="Architect"
              className="w-full h-1/2 rounded-lg shadow-md object-cover"
            />
            <img
              src={discussImage}
              alt="Renovation"
              className="w-full h-1/2 rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
