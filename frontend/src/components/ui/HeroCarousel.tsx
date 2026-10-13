import { useState, useEffect } from "react";
import fotoSlide0 from "../../assets/dubai123.jpg";
import fotoSlide1 from "../../assets/19bb0fc2c7ce-dubai-panoramica-t.jpg";
import fotoSlide2 from "../../assets/casaEsquina.jpeg";

export default function HeroCarousel() {
  const slides = [fotoSlide0, fotoSlide1, fotoSlide2];
  const [current, setCurrent] = useState(0);

  // autoplay cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleScrollToContent = () => {
    const element = document.getElementById("contenido-principal");
    if (element) {
      const yOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`slide-${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark overlay (VERY important) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-2xl">
          
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Encontrá tu próximo hogar
          </h1>

          <p className="mt-4 text-lg text-white/90">
            Propiedades en Santa Fe, Buenos Aires y alrededores
          </p>

          <button
            onClick={handleScrollToContent} className="mt-6 bg-[#db2754] px-6 py-3 rounded-lg font-semibold hover:bg-[#c0214a] transition"
          >
            Ver propiedades
          </button>

        </div>
      </div>
    </div>
  );
}