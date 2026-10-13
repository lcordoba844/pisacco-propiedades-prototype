export default function ListadoPropiedades() {
  return (
    <div className="p-4 md:p-6 text-[#112e3d]">
      <h2 className="text-2xl font-bold mb-6">Mis Propiedades</h2>

      {/* --- EL CONTENEDOR MÁGICO --- */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
        
        {/* A la tabla le ponemos un ancho mínimo para que no se aplaste en el celular */}
        <table className="w-full text-left border-collapse min-w-[800px]">
          
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="p-4 font-semibold">Propiedad</th>
              <th className="p-4 font-semibold">Operación</th>
              <th className="p-4 font-semibold">Precio</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100">
            {/* Ejemplo de una fila */}
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-medium text-sm">Casa en el centro</td>
              <td className="p-4 text-sm text-slate-600">Venta</td>
              <td className="p-4 text-sm text-slate-600">USD 120.000</td>
              <td className="p-4 flex justify-center gap-2">
                <button className="px-3 py-1.5 bg-slate-100 text-[#112e3d] text-xs font-bold rounded-md hover:bg-slate-200 transition">
                  Ver
                </button>
                <button className="px-3 py-1.5 bg-rose-50 text-[#db2754] text-xs font-bold rounded-md hover:bg-rose-100 transition">
                  Eliminar
                </button>
              </td>
            </tr>
            {/* Acá iría tu .map() iterando las propiedades */}
          </tbody>

        </table>
      </div>
      
    </div>
  );
}
