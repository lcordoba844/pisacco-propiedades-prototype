import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import logoImage from '../assets/perfilFacebookPisaccoPropiedades.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#112e3d] pt-16 pb-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Pisacco Propiedades Logo" 
                className="h-12 w-12 rounded-full border-2 border-white/10" 
              />
              <span className="text-2xl font-bold text-white tracking-tight">
                Pisacco <span className="font-light text-white/80">Propiedades</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed pr-4">
              Acompañándote en cada paso para encontrar tu lugar ideal. Transparencia, seguridad legal y trato humano en el mercado inmobiliario.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-[#db2754] hover:text-white transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-[#db2754] hover:text-white transition-all duration-300">
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Explorar</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-white/60 hover:text-[#db2754] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#db2754]/50"></span> Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-[#db2754] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#db2754]/50"></span> Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-[#db2754] transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#db2754]/50"></span> Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Oficinas y Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <FaMapMarkerAlt className="text-[#db2754] mt-1 shrink-0" size={16} />
                <span>Colón (Bs.As.) | Wheelwright (SF) | Hughes (SF)</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FaWhatsapp className="text-[#db2754] shrink-0" size={16} />
                <a href="https://wa.me/542473455831" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  +54 9 2473 45-5831
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <FaEnvelope className="text-[#db2754] shrink-0" size={16} />
                <a href="mailto:pisaccopropiedades@gmail.com" className="hover:text-white transition-colors">
                  pisaccopropiedades@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            © {currentYear} Pisacco Propiedades. Todos los derechos reservados.
          </p>
          
          <p className="text-white/40 text-xs flex items-center gap-1">
            Desarrollado por 
            <a 
              href="https://www.linkedin.com/in/lucascordobadev" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/60 hover:text-[#db2754] font-medium transition-colors"
            >
              Lucas Cordoba
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
