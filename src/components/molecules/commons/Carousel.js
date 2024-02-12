import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 10000); // Setiap 10 detik
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  useEffect(() => {
    setIsTransitioning(true);
    const timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Sesuaikan dengan durasi transisi
    return () => clearTimeout(timeoutId);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative max-w-screen mx-auto">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-2xl focus:outline-none"
      >
        <IconArrowLeft size="large" />
      </button>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Image
          src={images[currentSlide]}
          alt={`slide-${currentSlide}`}
          width={1100}
          height={400}
          className="w-full rounded-lg"
        />
      </div>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl focus:outline-none"
      >
        <IconArrowRight size="large" />
      </button>
    </div>
  );
};

export default Carousel;
