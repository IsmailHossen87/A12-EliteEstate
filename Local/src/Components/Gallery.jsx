import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ReusableTitle from "./ReusableTitle";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images
  const images = [
    { src: "https://i.ibb.co.com/VYqv7VPn/resort2.jpg", title: "Sea-Bridge Retreat" },
    { src: "https://i.ibb.co.com/y3tzTBY/factorys2.jpg", title: "Industrial Power Hub" },
    { src: "https://i.ibb.co.com/cHzdb2z/shoopavif.jpg", title: "Ready for Busines" },
    { src: "https://i.ibb.co.com/Ng4ZFvFW/officeavif.jpg", title: "Office Room" },
    { src: "https://i.ibb.co.com/RvrxDTw/land.webp", title: "Land " },
    { src: "https://i.ibb.co.com/tMbkLXLf/flat.jpg", title: "Ideal Urban Living " },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 mx-2 text-center gap-3 md:mt-5 mt-2 md:gap-5 my-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group"
            onClick={() => {
              setCurrentIndex(index);
              setOpen(true);
            }}
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.title}
              className="w-full md:h-72 h-28 rounded cursor-pointer shadow-md hover:shadow-lg transition transform group-hover:scale-105"
            />
            {/* Title Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition transform group-hover:scale-105">
              <p className="text-white text-lg w-3/4 mx-auto font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map((image) => ({ src: image.src }))}
          currentIndex={currentIndex}
          on={{
            viewChange: (newIndex) => setCurrentIndex(newIndex),
          }}
        />
      )}
    </div>
  );
};

export default Gallery;
