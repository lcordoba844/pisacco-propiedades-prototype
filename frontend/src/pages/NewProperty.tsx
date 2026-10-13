import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Importamos nuestro componente "tonto" para la zona de fotos
import ImageDropzone from "../components/ui/ImageDropzone"; 
import { propertyService } from "../services/property.service";

// 1. Definimos la interfaz estricta para el formulario
interface PropertyFormData {
  titulo: string;
  tipoPropiedad: string;
  tipoOperacion: string;
  moneda: string;
  precio: string;
  expensas: string;
  calle: string;
  altura: string;
  pisoDepto: string;
  localidad: string;
  provincia: string;
  metrosTotal: string;
  metrosCubiertos: string;
  ambientes: string;
  habitaciones: string;
  banos: string;
  cocheras: string;
  antiguedad: string;
  disposicion: string;
  descripcion: string;
  estadoPublicacion: string;
  gasNatural: boolean;
  aguaCorriente: boolean;
  cloacas: boolean;
  luzElectrica: boolean;
  pavimento: boolean;
  hasPatio: boolean;
  hasBalcon: boolean;
  hasPiscina: boolean;
}

export default function NewProperty() {
  const navigate = useNavigate();

  // 2. Le pasamos la interfaz al estado
  const [formData, setFormData] = useState<PropertyFormData>({
    titulo: "", tipoPropiedad: "casa", tipoOperacion: "venta", moneda: "USD",
    precio: "", expensas: "0", calle: "", altura: "", pisoDepto: "",
    localidad: "", provincia: "Santa Fe", metrosTotal: "", metrosCubiertos: "",
    ambientes: "1", habitaciones: "0", banos: "1", cocheras: "0",
    antiguedad: "a_estrenar", disposicion: "frente", descripcion: "",
    estadoPublicacion: "activa", gasNatural: false, aguaCorriente: false,
    cloacas: false, luzElectrica: false, pavimento: false, hasPatio: false,
    hasBalcon: false, hasPiscina: false,
  });

  const [imagenes, setImagenes] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await propertyService.createProperty(formData, imagenes);
      
      console.log("¡Propiedad creada y subida con éxito!");
      navigate("/admin");
      
    } catch (error) {
      console.error("Error al guardar la propiedad:", error);
      alert("Hubo un error. Revisá la consola del navegador para más detalles.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#112e3d]">Cargar Nueva Propiedad</h1>
        <Link 
          to="/admin" 
          className="text-xs font-semibold px-3.5 py-2 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 transition flex items-center gap-1.5"
        >
          ← Volver al Panel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        
        {/* SECCIÓN 1: INFORMACIÓN BÁSICA Y OPERACIÓN */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#112e3d] border-b pb-2 border-slate-100">1. Tipo de Operación y Precio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Título de la publicación</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] focus:border-[#db2754] outline-none transition text-sm" 
                placeholder="Ej: Excelente departamento de 2 dormitorios con cochera" required />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Tipo de Propiedad</label>
              <select name="tipoPropiedad" value={formData.tipoPropiedad} onChange={handleInputChange}
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm bg-white">
                <option value="casa">Casa</option>
                <option value="depto">Departamento</option>
                <option value="terreno">Terreno / Lote</option>
                <option value="local">Local Comercial</option>
                <option value="oficina">Oficina</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Tipo de Operación</label>
              <select name="tipoOperacion" value={formData.tipoOperacion} onChange={handleInputChange}
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm bg-white">
                <option value="venta">En Venta</option>
                <option value="alquiler">En Alquiler</option>
                <option value="temporario">Alquiler Temporario</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Moneda</label>
                <select name="moneda" value={formData.moneda} onChange={handleInputChange}
                  className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm bg-white">
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Precio</label>
                <input type="number" name="precio" value={formData.precio} onChange={handleInputChange} 
                  className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" placeholder="Monto" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Expensas (Opcional)</label>
              <input type="number" name="expensas" value={formData.expensas} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" placeholder="Valor mensual" />
            </div>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Estado Publicación</label>
              <select name="estadoPublicacion" value={formData.estadoPublicacion} onChange={handleInputChange}
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm bg-white">
                <option value="activa">Activa / Visible</option>
                <option value="pausada">Pausada</option>
                <option value="reservada">Reservada</option>
                <option value="vendida">Vendida / Alquilada</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: UBICACIÓN */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#112e3d] border-b pb-2 border-slate-100">2. Ubicación Geográfica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Calle / Dirección</label>
              <input type="text" name="calle" value={formData.calle} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" placeholder="Ej: Mitre" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Altura / N°</label>
              <input type="text" name="altura" value={formData.altura} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" placeholder="Ej: 450" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Piso / Depto</label>
              <input type="text" name="pisoDepto" value={formData.pisoDepto} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" placeholder="Ej: 3° B" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Localidad / Ciudad</label>
              <input type="text" name="localidad" value={formData.localidad} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Provincia</label>
              <input type="text" name="provincia" value={formData.provincia} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: MEDIDAS Y DISTRIBUCIÓN INTERNA */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#112e3d] border-b pb-2 border-slate-100">3. Características y Distribución</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Sup. Total (m²)</label>
              <input type="number" name="metrosTotal" value={formData.metrosTotal} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Sup. Cubierta (m²)</label>
              <input type="number" name="metrosCubiertos" value={formData.metrosCubiertos} onChange={handleInputChange} 
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Ambientes</label>
              <input type="number" name="ambientes" value={formData.ambientes} onChange={handleInputChange} min="1"
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Dormitorios</label>
              <input type="number" name="habitaciones" value={formData.habitaciones} onChange={handleInputChange} min="0"
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Baños</label>
              <input type="number" name="banos" value={formData.banos} onChange={handleInputChange} min="1"
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Cocheras</label>
              <input type="number" name="cocheras" value={formData.cocheras} onChange={handleInputChange} min="0"
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm" required />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Antigüedad</label>
              <select name="antiguedad" value={formData.antiguedad} onChange={handleInputChange}
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm bg-white">
                <option value="a_estrenar">A estrenar / En pozo</option>
                <option value="anos_1_5">1 a 5 años</option>
                <option value="anos_5_20">5 a 20 años</option>
                <option value="anos_mas_20">Más de 20 años</option>
                <option value="para_reciclar">Para reciclar / Refaccionar</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">Disposición</label>
              <select name="disposicion" value={formData.disposicion} onChange={handleInputChange}
                className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-[#db2754] outline-none text-sm bg-white">
                <option value="frente">Al frente</option>
                <option value="contrafrente">Al contrafrente</option>
                <option value="interno">Interno</option>
                <option value="lateral">Lateral</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: SERVICIOS Y AMENITIES (CHECKBOXES) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#112e3d] border-b pb-2 border-slate-100">4. Servicios y Extras</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { label: "Gas Natural", name: "gasNatural" },
              { label: "Agua Corriente", name: "aguaCorriente" },
              { label: "Cloacas", name: "cloacas" },
              { label: "Luz Eléctrica", name: "luzElectrica" },
              { label: "Pavimento", name: "pavimento" },
              { label: "Patio / Jardín", name: "hasPatio" },
              { label: "Balcón", name: "hasBalcon" },
              { label: "Piscina / Pileta", name: "hasPiscina" },
            ].map((item) => (
              <label key={item.name} className="flex items-center gap-3 cursor-pointer text-sm text-slate-700 hover:text-black">
                <input 
                  type="checkbox" 
                  name={item.name} 
                  // 4. Acá está la magia para que TS deje de enojarse (casteamos el name como llave estricta)
                  checked={formData[item.name as keyof PropertyFormData] as boolean} 
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded text-[#db2754] focus:ring-[#db2754] border-slate-300 transition"
                />
                {item.label}
              </label>
            ))}
          </div>
        </section>

        {/* SECCIÓN 5: DESCRIPCIÓN */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#112e3d] border-b pb-2 border-slate-100">5. Descripción Detallada</h2>
          <div>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows={5}
              className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-[#db2754] focus:border-[#db2754] outline-none transition text-sm resize-none" 
              placeholder="Detallá los puntos fuertes de la propiedad, condiciones de comercialización, entorno, etc..." required />
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* SECCIÓN 6: GALERÍA DE IMÁGENES (REFACTORIZADA) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#112e3d] border-b pb-2 border-slate-100">6. Galería de Fotos</h2>
          
          {/* Usamos tu componente limpio en vez de las 20 líneas de eventos crudos */}
          <ImageDropzone 
            onFilesAdded={(nuevosArchivos) => setImagenes(prev => [...prev, ...nuevosArchivos])} 
          />

          {/* Listado de archivos cargados */}
          {imagenes.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {imagenes.map((img, index) => (
                <span key={index} className="bg-rose-100 text-[#db2754] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                  {img.name}
                  <button type="button" onClick={() => setImagenes(prev => prev.filter((_, i) => i !== index))} className="font-black hover:text-black">×</button>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* ACCIONES DEL FORMULARIO */}
        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate("/admin")} disabled={isSubmitting} className="px-6 py-2.5 border border-slate-300 text-[#112e3d] text-sm font-semibold rounded-lg hover:bg-slate-50 transition disabled:opacity-50">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-[#db2754] text-white text-sm font-bold rounded-lg hover:bg-rose-700 shadow-sm transition disabled:opacity-50 flex items-center gap-2">
            {isSubmitting ? "Subiendo propiedad..." : "Guardar Propiedad Completa"}
          </button>
        </div>
      </form>
    </div>
  );
}
