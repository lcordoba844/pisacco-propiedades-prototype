import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { propertyService } from "../services/property.service";
import type { PropertyResponse } from "../interfaces/property.type"; 

import Spinner from '../components/ui/Spinner';
import Card from "../components/ui/Card";
import HeroCarousel from "../components/ui/HeroCarousel";

export default function Home() {
  const [propiedades, setPropiedades] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // --- ESTADOS DEL CARRUSEL ---
  const [currentIndex, setCurrentIndex] = useState<number>(4); // Arrancamos en 4 por los clones iniciales
  const [withTransition, setWithTransition] = useState<boolean>(true);
  const [itemsToShow, setItemsToShow] = useState<number>(4); // Dinámico por pantalla

  // 1. Carga de datos desde el backend
  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const data = await propertyService.getLatestProperties();
        setPropiedades(data);
      } catch (error) {
        console.error("Error cargando propiedades desde el Home:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedades();
  }, []);

  // 2. Escuchar el tamaño de pantalla para saber cuántas tarjetas mostrar por fila
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(4);     // Desktop: 4 columnas
      else if (window.innerWidth >= 640) setItemsToShow(2);  // Tablet: 2 columnas
      else setItemsToShow(1);                                // Mobile: 1 columna
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Guardas preventivas si no hay datos o sigue cargando
  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Spinner texto="Cargando catálogo..." /></div>;
  if (propiedades.length === 0) {
    return (
      <div className="grow flex flex-col h-full bg-slate-50 py-20 text-center text-slate-500 font-medium">
        No hay propiedades disponibles en este momento.
      </div>
    );
  }

  // --- LÓGICA DE CLONACIÓN PARA EL BUCLE INFINITO ---
  // Clonamos las últimas 4 al principio y las primeras 4 al final
  const clonesIniciales = propiedades.slice(-4);
  const clonesFinales = propiedades.slice(0, 4);
  const listaExtendida = [...clonesIniciales, ...propiedades, ...clonesFinales];

  const handleNext = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Esta función se ejecuta automáticamente CUANDO TERMINA la animación CSS
  const handleTransitionEnd = () => {
    // Si pasamos la última propiedad real y estamos viendo los clones del principio...
    if (currentIndex >= propiedades.length + 4) {
      setWithTransition(false); // Apagamos la animación instantáneamente
      setCurrentIndex(4);       // Saltamos a la posición real original
    }
    // Si fuimos hacia atrás y pasamos la primera propiedad real...
    else if (currentIndex < 4) {
      setWithTransition(false);
      setCurrentIndex(currentIndex + propiedades.length); // Saltamos al extremo real derecho
    }
  };

  return (
    <div className="grow flex flex-col h-full bg-slate-50">
      <HeroCarousel />

      {/* Gradiente de transición suave */}
      <div className="h-16 bg-gradient-to-b from-transparent to-slate-50 -mt-16 relative z-10" />

      {/* Sección del Catálogo */}
      <div id="contenido-principal" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        
        {/* Encabezado con Botones de Navegación integrados a los lados */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#112e3d]">
              Propiedades en <span className="text-[#db2754]">Venta</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-sm sm:text-base">
              Explorá nuestro catálogo exclusivo en tiempo real
            </p>
          </div>

          {/* Flechas de control de diseño premium */}
          {propiedades.length > itemsToShow && (
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#112e3d] flex items-center justify-center hover:bg-[#112e3d] hover:text-white hover:border-[#112e3d] transition-all duration-200 shadow-sm"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#112e3d] flex items-center justify-center hover:bg-[#112e3d] hover:text-white hover:border-[#112e3d] transition-all duration-200 shadow-sm"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          )}
        </div>

        {/* --- CONTENEDOR MÁSTERS DEL SLIDER --- */}
        <div className="relative w-full overflow-hidden rounded-2xl p-1">
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex gap-6 ${withTransition ? "transition-transform duration-500 ease-out" : ""}`}
            style={{
              // Calculamos el desplazamiento matemático exacto según el índice actual
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {listaExtendida.map((prop, index) => (
              <div
                key={`${prop.id}-${index}`}
                className="shrink-0 flex-grow-0"
                style={{
                  // Forzamos a que cada tarjeta ocupe exactamente la fracción de pantalla que le corresponde
                  // Restamos un proporcional de la separación (gap) para que encuadre al milímetro
                  width: `calc(${100 / itemsToShow}% - ${(gap => gap - gap / itemsToShow)(24)}px)`,
                }}
              >
                <Link to={`/fichaProp/${prop.id}`}>
                  <Card property={prop} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
