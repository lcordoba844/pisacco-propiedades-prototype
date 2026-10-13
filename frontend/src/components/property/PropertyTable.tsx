import { Link } from "react-router-dom";
import { formatPrice, formatPropertyRef } from "../../utils/formatters";
import type { PropertyResponse } from "../../interfaces/property.type";

interface PropertyTableProps {
  propiedades: PropertyResponse[];
  onDelete: (id: string) => void; // Recibimos la función de borrado como prop
}

export default function PropertyTable({ propiedades, onDelete }: PropertyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <th className="p-4 font-semibold">Ref / ID</th>
            <th className="p-4 font-semibold">Título</th>
            <th className="p-4 font-semibold">Operación</th>
            <th className="p-4 font-semibold">Precio</th>
            <th className="p-4 font-semibold text-center">Acciones</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-slate-100">
          {propiedades.map((prop) => (
            <tr key={prop.id} className="hover:bg-slate-50 transition-colors text-slate-700">
              
              <td className="p-4 font-mono text-xs text-slate-400">
                {formatPropertyRef(prop.id)}
              </td>
              
              <td className="p-4 font-medium text-sm">
                {prop.titulo}
              </td>
              
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  prop.alquilerVenta === 'Venta' 
                    ? 'bg-rose-50 text-[#db2754]' 
                    : 'bg-sky-50 text-sky-700'
                }`}>
                  {prop.alquilerVenta}
                </span>
              </td>
              
              <td className="p-4 font-bold text-[#112e3d] text-sm">
                {prop.tipoMoneda} {formatPrice(prop.precio)}
              </td>
              
              <td className="p-4 flex justify-center gap-2">
                <Link 
                  to={`/fichaProp/${prop.id}`} 
                  target="_blank"
                  className="px-3 py-1.5 bg-slate-100 text-[#112e3d] text-xs font-bold rounded-md hover:bg-slate-200 transition"
                >
                  Ver
                </Link>
                <button 
                  onClick={() => onDelete(prop.id)} // Usamos la prop recibida
                  className="px-3 py-1.5 bg-rose-50 text-[#db2754] text-xs font-bold rounded-md hover:bg-rose-100 transition"
                >
                  Eliminar
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
