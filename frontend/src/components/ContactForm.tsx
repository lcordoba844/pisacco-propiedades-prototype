import { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaUser, FaCommentAlt } from 'react-icons/fa';

interface FormData {
  name: string;
  mail: string;
  msg: string;
}

const ContactForm: React.FC = () => {
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

  const handleWhatsApp = () => {
    if (!formData.name || !formData.msg) return alert("Por favor, completá tu nombre y mensaje.");
    
    const phone = "542473455831";
    const message = `¡Hola! Mi nombre es ${formData.name}.\nCorreo: ${formData.mail}\n\nConsulta: ${formData.msg}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const handleEmail = () => {
    if (!formData.name || !formData.mail || !formData.msg) return alert("Por favor, completá todos los campos.");

    const email = "contacto@pisaccopropiedades.com";
    const subject = `Consulta web de ${formData.name}`;
    const body = `Nombre: ${formData.name}\nCorreo: ${formData.mail}\n\nMensaje:\n${formData.msg}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <form className="w-full bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-8">
      
      {/* Cabecera del formulario */}
      <div className="space-y-2 border-b border-slate-100 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#112e3d] tracking-tight">
          Enviá tu consulta
        </h2>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Completá el formulario detallando tu búsqueda o propiedad de interés y te responderemos a la brevedad.
        </p>
      </div>

      {/* Campos de entrada */}
      <div className="space-y-5">
        
        {/* Nombre */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Nombre Completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Ej: Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#db2754]/20 focus:border-[#db2754] transition text-sm text-slate-700"
            />
          </div>
        </div>

        {/* Correo */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Correo Electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="mail"
              placeholder="juan@ejemplo.com"
              value={formData.mail}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#db2754]/20 focus:border-[#db2754] transition text-sm text-slate-700"
            />
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
            Mensaje
          </label>
          <div className="relative">
            <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-400">
              <FaCommentAlt />
            </div>
            <textarea
              name="msg"
              rows={4}
              placeholder="Me interesa recibir más información sobre..."
              value={formData.msg}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#db2754]/20 focus:border-[#db2754] transition resize-none text-sm text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-4 rounded-xl font-bold hover:bg-[#20bd5a] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaWhatsapp className="text-xl" />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={handleEmail}
          className="flex-1 flex items-center justify-center gap-2 bg-[#112e3d] text-white py-3.5 px-4 rounded-xl font-bold hover:bg-[#0a1f2b] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaEnvelope />
          Enviar Email
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
