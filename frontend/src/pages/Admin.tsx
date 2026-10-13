import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { propertyService } from "../services/property.service";
import { authService } from "../services/auth.service";
import type { PropertyResponse } from "../interfaces/property.type";
import Spinner from "../components/ui/Spinner";
import PropertyTable from "../components/property/PropertyTable";

export default function Admin() {
  const [propiedades, setPropiedades] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarPropiedades();
  }, []);

  const cargarPropiedades = async () => {
    try {
      const data = await propertyService.getLatestProperties();
      setPropiedades(data);
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login");
  };

  const handleDelete = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar esta propiedad?");
    if (confirmar) {
      try {
        await propertyService.deleteProperty(id);
        setPropiedades(propiedades.filter(prop => prop.id !== id));
      } catch (error) {
        alert("Hubo un error al intentar eliminar la propiedad.");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header del Admin */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#112e3d]">Panel de Control</h1>
              <Link 
                to="/" 
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 transition flex items-center gap-1.5"
                title="Ir a la web pública"
              >
                ← Ver Web
              </Link>
            </div>
            <p className="text-slate-500 mt-1">Gestioná las propiedades de tu inmobiliaria</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              to="/admin/nueva" 
              className="flex-1 sm:flex-none text-center bg-[#db2754] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-rose-700 shadow-sm transition text-sm"
            >
              + Agregar Propiedad
            </Link>
            <button
              onClick={handleLogout}
              className="text-center border border-slate-300 bg-white text-slate-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-slate-100 hover:text-slate-800 transition text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="py-10">
              <Spinner texto="Cargando propiedades..." />
            </div>
          ) : propiedades.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg font-medium">No hay propiedades cargadas aún.</p>
              <p className="text-slate-400 text-sm mt-2">Hacé click en "+ Agregar Propiedad" para empezar.</p>
            </div>
          ) : (
            /* Delegamos toda la lógica visual a nuestro nuevo componente de dominio */
            <PropertyTable propiedades={propiedades} onDelete={handleDelete} />
          )}
        </div>

      </div>
    </div>
  );
}
