import { formatPrice, formatPropertyRef } from "../../utils/formatters";

interface PropertySidebarProps {
  id: string;
  titulo: string;
  precio: number;
  tipoMoneda: string;
  alquilerVenta: string;
  lat?: number | string | null;
  lng?: number | string | null;
  direccion?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
}

export default function PropertySidebar({
  id,
  titulo,
  precio,
  tipoMoneda,
  alquilerVenta,
  lat,
  lng,
  direccion,
  ciudad,
  provincia
}: PropertySidebarProps) {
  const hasRawCoordinates =
    lat !== null &&
    lat !== undefined &&
    String(lat).trim() !== "" &&
    lng !== null &&
    lng !== undefined &&
    String(lng).trim() !== "";
  const latitude = Number(lat);
  const longitude = Number(lng);
  const hasCoordinates =
    hasRawCoordinates && Number.isFinite(latitude) && Number.isFinite(longitude);
  const addressQuery = [direccion, ciudad, provincia, "Argentina"]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(", ");
  const mapQuery = hasCoordinates
    ? `${latitude},${longitude}`
    : addressQuery;
  const mapUrl = mapQuery
    ? `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=es&z=15&output=embed`
    : '';

  return (
    <div className="sticky top-24 space-y-6">
      
      {/* Tarjeta de Acción (Precio y Contacto) */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
        <p className="text-sm text-slate-500 mb-1 font-medium">
          Valor de {alquilerVenta.toLowerCase()}
        </p>
        <h2 className="text-3xl font-black text-[#112e3d] mb-6">
          {tipoMoneda} {formatPrice(precio)}
        </h2>
        <a 
          href={`https://wa.me/542473455831?text=Hola! Estoy interesado en la propiedad ${formatPropertyRef(id)} (${titulo})`}
          target="_blank"
          rel="noreferrer"
          className="w-full block text-center bg-[#db2754] text-white font-bold py-3.5 rounded-xl hover:bg-rose-700 transition shadow-md hover:shadow-lg"
        >
          Contactar a un asesor
        </a>
      </div>

      {/* Mapa de Ubicación */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-[#112e3d] mb-4">Ubicación aproximada</h3>
        <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-200">
          {mapUrl ? (
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Mapa de ubicación"
              className="grayscale-[30%] contrast-[90%]"
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-slate-400 text-center px-4">
              Ubicación exacta no provista
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
