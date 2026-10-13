import { useState } from "react";
// Importamos el nuevo componente
import ImageLightbox from "../ui/ImageLightbox";

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-72 bg-slate-200 rounded-2xl mb-10 flex items-center justify-center">
        <p className="text-slate-500">Imágenes no disponibles</p>
      </div>
    );
  }

  const isSingle = images.length === 1;
  const lateralImages = images.slice(1, 5);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-10 h-72 sm:h-80 md:h-112.5 rounded-2xl overflow-hidden shadow-sm bg-slate-100">
        
        {/* Imagen Principal */}
        <div 
          className={`${
            isSingle ? "col-span-1 md:col-span-4" : "col-span-1 md:col-span-2"
          } h-full cursor-pointer relative group bg-slate-900 overflow-hidden`}
          onClick={() => setSelectedIndex(0)}
        >
          <img 
            src={images[0]} 
            alt="Principal" 
            className="w-full h-full object-cover object-center transition duration-300 group-hover:opacity-90" 
          />
        </div>
        
        {/* Columna Lateral */}
        {!isSingle && lateralImages.length > 0 && (
          <div className="hidden md:flex md:col-span-2 gap-2 h-full w-full">
            {lateralImages.length <= 2 ? (
              <div className="flex flex-col gap-2 w-full h-full">
                {lateralImages.map((img, i) => (
                  <div 
                    key={i} 
                    className="flex-1 h-0 relative group cursor-pointer overflow-hidden rounded-md bg-slate-900"
                    onClick={() => setSelectedIndex(i + 1)}
                  >
                    <img src={img} alt={`Lateral-${i}`} className="w-full h-full object-cover object-center transition duration-300 group-hover:opacity-90" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full h-full">
                {lateralImages.map((img, i) => (
                  <div 
                    key={i} 
                    className="relative group cursor-pointer overflow-hidden rounded-md bg-slate-900 h-full"
                    onClick={() => setSelectedIndex(i + 1)}
                  >
                    <img src={img} alt={`Grid-${i}`} className="w-full h-full object-cover object-center transition duration-300 group-hover:opacity-90" />
                    {i === 3 && images.length > 5 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition hover:bg-black/60">
                        <span className="text-white font-bold text-lg">+ {images.length - 5} fotos</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Renderizado condicional del Lightbox independiente */}
      {selectedIndex !== null && (
        <ImageLightbox 
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex(prev => (prev === null || prev === 0 ? images.length - 1 : prev - 1))}
          onNext={() => setSelectedIndex(prev => (prev === null || prev === images.length - 1 ? 0 : prev + 1))}
        />
      )}
    </>
  );
}
