import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para mejorar la UX
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authService.login({ email, password: contrasena });
      navigate("/admin");
    } catch (err) {
      setError("Credenciales incorrectas. Verificá tus datos.");
      setIsLoading(false);
    }
  };

  return (
    // Fondo oscuro con el color de la marca para dar aspecto de "Caja fuerte / Panel privado"
    <div className="min-h-screen flex items-center justify-center bg-[#112e3d] p-4">
      
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        
        {/* --- HEADER DEL LOGIN (Simulación del Logo) --- */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#db2754] rounded-full flex items-center justify-center mb-4 shadow-md">
            <span className="text-white font-bold text-xl tracking-tighter">P</span>
          </div>
          <h1 className="text-2xl font-bold text-[#112e3d]">Pisacco Propiedades</h1>
          <p className="text-sm text-slate-500 mt-1">Panel de Administración</p>
        </div>
        
        {/* --- MENSAJE DE ERROR --- */}
        {error && (
          <div className="bg-rose-50 border-l-4 border-[#db2754] p-4 mb-6 rounded-r-md">
            <p className="text-sm text-[#db2754] font-medium">{error}</p>
          </div>
        )}
        
        {/* --- FORMULARIO --- */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Input Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              {/* Ícono de Mail (SVG) */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#db2754] focus:border-transparent outline-none transition-all text-sm text-slate-700"
                placeholder="admin@pisaccopropiedades.com"
                required 
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Contraseña
            </label>
            <div className="relative">
              {/* Ícono de Candado (SVG) */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#db2754] focus:border-transparent outline-none transition-all text-sm text-slate-700"
                placeholder="••••••••"
                required 
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Botón Submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 py-3 px-4 mt-6 rounded-xl text-white font-bold text-sm shadow-md transition-all 
              ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#db2754] hover:bg-[#be1f47] hover:shadow-lg'}`}
          >
            {isLoading ? (
              <>
                {/* Spinner animado */}
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ingresando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
        
      </div>
    </div>
  );
}
