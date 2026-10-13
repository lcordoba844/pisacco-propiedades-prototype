import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import fotoFondo from "../../assets/foto_fondo.jpg";

const images = [
  fotoFondo,
  "https://source.unsplash.com/random/800x400?nature,2",
  "https://source.unsplash.com/random/800x400?nature,3",
];

const Carousel = ({ autoSlide = true, slideInterval = 3000 }: { autoSlide?: boolean; slideInterval?: number }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const slideRef = useRef<number | null>(null);

  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);

  useEffect(() => {
    if (!autoSlide) return;

    slideRef.current = window.setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, slideInterval);

    return () => {
      if (slideRef.current) clearInterval(slideRef.current);
    };
  }, [autoSlide, slideInterval, length]);

  return (
    <div
      className="relative w-full max-w-3xl h-96 mx-auto overflow-hidden rounded-lg"
      onMouseEnter={() => {
        if (slideRef.current) clearInterval(slideRef.current);
      }}
      onMouseLeave={() => {
        if (autoSlide) {
          slideRef.current = window.setInterval(() => {
            setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
          }, slideInterval);
        }
      }}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-300 w-full h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img 
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className="w-full h-full flex-shrink-0" />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
      >
        <FaArrowRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${idx === current ? "bg-white" : "bg-gray-400"}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;