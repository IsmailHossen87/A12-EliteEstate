import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slidesData = [
    {
      id: 1,
      image:
        "https://i.ibb.co.com/FBSxdDC/land1.jpg",
      header: "Find Your Perfect Plot",
      sort: "Discover the best land deals in prime locations at unbeatable prices.",
    },
    {
      id: 2,
      image:
        "https://i.ibb.co.com/k2gXKbz/land2.jpg",
      header: "Buy and Sell Lands Easily",
      sort: "List your property or explore available lands with just a few clicks.",
    },
    {
      id: 3,
      image:
        "https://i.ibb.co.com/rM3h2WH/land3.jpg",
      header: "Secure Your Future Investment",
      sort: "Invest in land today and watch your asset grow over time.",
    },
  ];
  

const Banner = () => {
  return (
   <>
   <style>
      {`
        @keyframes zoom-in-out {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05); 
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-zoom-in-out {
          animation: zoom-in-out 15s ease-in-out infinite;
        }
      `}
    </style>
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full"
    >
      {slidesData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="hero h-[280px] md:h-[600px] animate-zoom-in-out bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="hero-overlay bg-opacity-65"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 md:text-5xl text-2xl font-bold text-white">
                  {slide.header}
                </h1>
                <p className="mb-5 text-white">{slide.sort}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper></>
  );
};

export default Banner;
