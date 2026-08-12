import React, { useState, useEffect } from "react";
import "../styles/ProductSlider.css";

import img1 from "../assets/banner1.jpg";
import img2 from "../assets/banner2.jpg";
import img3 from "../assets/banner3.jpg";
import img4 from "../assets/banner4.jpg";
import img5 from "../assets/banner5.jpg";
import img6 from "../assets/banner6.jpg";

function ImageSlider() {
  const images = [img1, img2, img3, img4, img5, img6];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  
  // ✅ Auto Slide (Place it here)
   useEffect(() => {
     const interval = setInterval(() => {
       nextSlide();
     }, 3000); // Change image every 3 seconds

     return () => clearInterval(interval);
   }, [current]);
   
  return (
    <div className="slider">
      <button className="left-btn" onClick={prevSlide} >
        &#10094;
      </button>

      <img
        src={images[current]}
        alt="Banner"
        className="slider-image"
      />

      <button className="right-btn" onClick={nextSlide} >
        &#10095;
      </button>
    </div>
  );
}

export default ImageSlider;