import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNext, onPrev }: ImageLightboxProps) {
  // --- EFECTOS AVANZADOS (Teclado y Scroll) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    // Bloqueamos el scroll del body
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition"
        onClick={onClose}
      >
        <FaTimes />
      </button>

      {images.length > 1 && (
        <button 
          className="absolute left-4 sm:left-10 text-white/70 hover:text-white text-4xl sm:text-5xl transition p-2"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <FaChevronLeft />
        </button>
      )}

      <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
        <img 
          src={images[currentIndex]} 
          alt={`Pantalla completa ${currentIndex + 1}`} 
          className="max-w-full max-h-[85vh] object-contain rounded-sm select-none"
          onClick={(e) => e.stopPropagation()}
        />
        <p className="text-white/60 mt-4 font-mono text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {images.length > 1 && (
        <button 
          className="absolute right-4 sm:right-10 text-white/70 hover:text-white text-4xl sm:text-5xl transition p-2"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
}
