import type { FC } from "react";
import { formatPropertyRef } from "../../utils/formatters";
import type { PropertyResponse } from "../../interfaces/property.type";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";

// Importamos la imagen por defecto
import fallbackImg from "../../assets/perfilFacebookPisaccoPropiedades.jpg";

interface CardProps {
  property: PropertyResponse;
}

// Transformador "al vuelo" para Cloudinary
const getOptimizedThumbnail = (url: string) => {
  // Si la imagen es local (el fallback) o de otra fuente, la dejamos intacta
  if (!url.includes('cloudinary.com')) return url;
  
  // Le pedimos a Cloudinary: ancho 500px (w_500), calidad automática (q_auto), formato moderno (f_auto)
  return url.replace('/upload/', '/upload/w_500,q_auto,f_auto/');
};

const Card: FC<CardProps> = ({ property }) => {
  // Procesamos la URL antes de renderizarla
  const rawImageUrl = property.imagenes?.[0]?.url || fallbackImg;
  const optimizedUrl = getOptimizedThumbnail(rawImageUrl);

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      <div className="relative bg-slate-100">
        <img 
          src={optimizedUrl} 
          alt={property.direccion || property.titulo} 
          loading="lazy" /* <-- EL SECRETO DEL RENDIMIENTO: Solo carga cuando está por aparecer en pantalla */
          className="w-full h-52 object-cover" 
        />

        <span className="absolute top-3 left-3 bg-[#db2754] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
          {property.alquilerVenta}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs text-slate-400 font-mono mb-1">
          {formatPropertyRef(property.id)}
        </p>

        <h2 className="text-lg font-bold text-[#112e3d] line-clamp-2 leading-tight">
          {property.titulo}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {property.ciudad}
        </p>

        <div className="border-t border-slate-100 mt-4 pt-4">
          <div className="flex justify-between text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-1.5" title="Baños">
              <FaBath className="text-[#db2754]" />
              <span>{property.banos}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Dormitorios">
              <FaBed className="text-[#db2754]" />
              <span>{property.dormitorios}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Metros cuadrados">
              <FaRulerCombined className="text-[#db2754]" />
              <span>{property.metros2construidos} m²</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Card;
