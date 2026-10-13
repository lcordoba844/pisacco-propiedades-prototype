import { useState } from 'react';

interface FormData {
  name: string;
  mail: string;
  msg: string;
  [key: string]: string;
}

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mail: '',
    msg: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="w-full bg-white p-8 rounded-xl shadow-md space-y-6">
      
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Enviá tu consulta
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Completá el formulario y te responderemos a la brevedad
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Titulo"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="name"
          placeholder="Tipo"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="name"
          placeholder="Direccion"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="name"
          placeholder="Barrio"
          value={formData.neighborhood}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="name"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="name"
          placeholder="Provincia"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="name"
          placeholder="Baños"
          value={formData.bathrooms}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />

        <input
          type="text"
          name="mail"
          placeholder="Metros Construidos"
          value={formData.mts2construidos}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
              <input
          type="text"
          name="mail"
          placeholder="Metros Cubiertos"
          value={formData.mts2cubiertos}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Metros Semi-Cubiertos"
          value={formData.mts2semicubiertos}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="dormitorios"
          value={formData.bedrooms}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="antigüedad"
          value={formData.antiquity}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Condicion"
          value={formData.condition}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Categoria edificio"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Frente/Contra-frente"
          value={formData.frente_contraFrente}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Alquiler/Venta"
          value={formData.alquiler_venta}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <label htmlFor="servicios">Agregar servicios:</label>
        <select name="paises" id="paises">
        <option value="arg">Argentina</option>
        <option value="esp">España</option>
        <option value="mex">México</option>
        </select>
        <input
          type="text"
          name="mail"
          placeholder="Plantas"
          value={formData.floors}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Orientacion"
          value={formData.orientation}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Tipo de Piso"
          value={formData.floorType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Cochera"
          value={formData.garage}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Latitud"
          value={formData.latitude}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Longitud"
          value={formData.longitud}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        <input
          type="text"
          name="mail"
          placeholder="Imagenes"
          value={formData.img}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition"
        />
        


        <textarea
          name="msg"
          rows={4}
          placeholder="Ambientes"
          value={formData.rooms}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2754] focus:border-transparent transition resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        
        <button
          type="button"
          onClick={() => undefined}
          className="flex-1 bg-[#db2754] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#c0214a] transition"
        >
          Enviar por WhatsApp
        </button>

        <button
          type="button"
          onClick={() => undefined}
          className="flex-1 border border-[#db2754] text-[#db2754] py-3 px-4 rounded-lg font-medium hover:bg-[#db2754] hover:text-white transition"
        >
          Enviar por Email
        </button>

      </div>
    </form>
  );
};

export default AddPropertyForm;
