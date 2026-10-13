import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImage from '../assets/perfilFacebookPisaccoPropiedades.jpg';
import { authService } from "../services/auth.service";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hook para saber en qué URL estamos
  const isAdmin = authService.isAuthenticated();

  // Función maestra: Cierra el menú en móviles y resetea el scroll arriba de todo
  const handleNavigation = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper para detectar si un link es la página actual
  const isActive = (path: string) => location.pathname === path;

  // Lista de rutas para no repetir código
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Sobre Nosotros", path: "/about" },
    { name: "Contacto", path: "/contact" }
  ];

  return (
    <nav className="bg-[#112e3d] shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20"> {/* Aumentamos a h-20 para más aire */}
          
          {/* Logo + Nombre */}
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="Pisacco Propiedades Logo" 
              className="h-10 w-10 rounded-full border-2 border-white/10 shadow-sm" 
            />
            <Link 
              to="/" 
              onClick={handleNavigation} 
              className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-1"
            >
              Pisacco <span className="font-light text-white/80 hidden sm:inline">Propiedades</span>
            </Link>
          </div>

          {/* Botón menú móvil */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-[#db2754] transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={handleNavigation}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group py-2
                  ${isActive(link.path) ? "text-[#db2754]" : "text-white/80 hover:text-white"}`}
              >
                {link.name}
                {/* Subrayado animado: siempre visible si está activo, o aparece al hacer hover */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#db2754] transform origin-left transition-transform duration-300 ease-out
                  ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}>
                </span>
              </Link>
            ))}

            {/* Acceso directo al Panel de Admin solo si hay sesión iniciada */}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={handleNavigation}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all border ${
                  isActive("/admin")
                    ? "bg-[#db2754] text-white border-[#db2754] shadow-sm"
                    : "text-rose-300 border-rose-500/40 hover:bg-rose-500/20 hover:text-white"
                }`}
              >
                ⚙ Panel Admin
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Menú Móvil (Desplegable) */}
      <div 
        className={`md:hidden absolute w-full bg-[#112e3d] border-t border-white/5 shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              onClick={handleNavigation}
              className={`block text-sm font-bold uppercase tracking-wider transition-colors 
                ${isActive(link.path) ? "text-[#db2754]" : "text-white/80 hover:text-white"}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Menú Móvil: Acceso directo solo si es admin */}
          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={handleNavigation}
              className={`block text-sm font-bold uppercase tracking-wider transition-colors pt-2 border-t border-white/10 ${
                isActive("/admin") ? "text-[#db2754]" : "text-rose-400 hover:text-white"
              }`}
            >
              ⚙ Panel de Administración
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
