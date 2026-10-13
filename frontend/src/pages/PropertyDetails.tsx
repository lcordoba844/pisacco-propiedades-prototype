import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatPropertyRef } from "../utils/formatters";
import { propertyService } from "../services/property.service";
import type { PropertyResponse } from "../interfaces/property.type";

// Componentes de UI y Dominio
import Spinner from "../components/ui/Spinner";
import PropertyGallery from "../components/property/PropertyGallery";
import PropertySidebar from "../components/property/PropertySidebar";

// Íconos solo para el bloque central que quedó
import { FaBed, FaBath, FaRulerCombined, FaCar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [prop, setProp] = useState<PropertyResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Ficha de Propiedad | Pisacco Propiedades";

    const fetchProperty = async () => {
      try {
        if (id) {
          const data = await propertyService.getPropertyById(id);
          setProp(data);
        }
      } catch (error) {
        console.error("Error al cargar la propiedad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // --- ESTADOS DE CARGA Y ERROR ---
  if (loading) {
    return <Spinner texto="Cargando propiedad..." />;
  }

  if (!prop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h2 className="text-3xl font-bold text-[#112e3d] mb-2">Propiedad no encontrada</h2>
        <p className="text-slate-500 mb-6">Es posible que la publicación haya sido eliminada o el enlace sea incorrecto.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#db2754] text-white font-bold rounded-lg hover:bg-rose-700 transition">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const images = prop.imagenes?.map(img => img.url) || []; 

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER: Título y Ubicación --- */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-rose-100 text-[#db2754] text-xs font-bold uppercase tracking-wider rounded-full">
              {prop.alquilerVenta}
            </span>
            <span className="text-sm text-slate-500 font-mono bg-slate-200 px-2 py-1 rounded">
              {formatPropertyRef(prop.id)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#112e3d] mb-3 leading-tight">
            {prop.titulo}
          </h1>
          <div className="flex items-center text-slate-500 text-sm sm:text-base">
            <FaMapMarkerAlt className="text-[#db2754] mr-2" />
            <span>{prop.barrio} · {prop.ciudad} · {prop.provincia}</span>
          </div>
        </div>

        {/* --- GALERÍA ENCAPSULADA --- */}
        <PropertyGallery images={images} />

        {/* --- CONTENIDO PRINCIPAL Y SIDEBAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* COLUMNA IZQUIERDA: Detalles de la Propiedad */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Highlights rápidos */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-slate-200">
              <div className="flex items-center gap-3">
                <FaRulerCombined className="text-[#db2754] text-xl" />
                <div>
                  <p className="text-sm text-slate-500">Superficie Cubierta</p>
                  <p className="font-bold text-[#112e3d]">{prop.metros2construidos} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBed className="text-[#db2754] text-xl" />
                <div>
                  <p className="text-sm text-slate-500">Dormitorios</p>
                  <p className="font-bold text-[#112e3d]">{prop.dormitorios}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBath className="text-[#db2754] text-xl" />
                <div>
                  <p className="text-sm text-slate-500">Baños</p>
                  <p className="font-bold text-[#112e3d]">{prop.banos}</p>
                </div>
              </div>
              {prop.cochera && (
                <div className="flex items-center gap-3">
                  <FaCar className="text-[#db2754] text-xl" />
                  <div>
                    <p className="text-sm text-slate-500">Cochera</p>
                    <p className="font-bold text-[#112e3d]">Sí</p>
                  </div>
                </div>
              )}
            </div>

            {prop.descripcion && (
              <section>
                <h2 className="text-2xl font-bold text-[#112e3d] mb-4">Descripción</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {prop.descripcion}
                </p>
              </section>
            )}

            {/* Otras Características */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-[#112e3d] mb-6">Otras Características</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
                <div className="flex flex-col border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Ambientes</span>
                  <span className="font-semibold text-[#112e3d]">{prop.ambientes}</span>
                </div>
                <div className="flex flex-col border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Antigüedad</span>
                  <span className="font-semibold text-[#112e3d]">{prop.antiguedad ? `${prop.antiguedad} años` : 'A estrenar'}</span>
                </div>
                <div className="flex flex-col border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Plantas</span>
                  <span className="font-semibold text-[#112e3d]">{prop.plantas || 1}</span>
                </div>
                <div className="flex flex-col border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Tipo</span>
                  <span className="font-semibold text-[#112e3d] capitalize">{prop.tipo}</span>
                </div>
              </div>
            </section>

            {/* Servicios */}
            <section>
              <h2 className="text-xl font-bold text-[#112e3d] mb-6">Servicios e Instalaciones</h2>
              {prop.servicios && prop.servicios.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {prop.servicios.map((servicio) => (
                    <div key={servicio.id} className="flex items-center gap-2 text-slate-700 text-sm">
                      <FaCheckCircle className="text-green-500 shrink-0" />
                      <span>{servicio.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No hay servicios especificados.</p>
              )}
            </section>

          </div>

          {/* --- SIDEBAR ENCAPSULADO --- */}
          <div className="lg:col-span-1">
            <PropertySidebar 
              id={prop.id}
              titulo={prop.titulo}
              precio={Number(prop.precio)}
              tipoMoneda={prop.tipoMoneda}
              alquilerVenta={prop.alquilerVenta}
              lat={prop.lat}
              lng={prop.lng}
              direccion={prop.direccion}
              ciudad={prop.ciudad}
              provincia={prop.provincia}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
