import { Link } from 'react-router-dom';
import { FaHandshake, FaHome, FaBalanceScale } from 'react-icons/fa';
import perfilImage from '../assets/perfilFacebookPisaccoPropiedades.jpg';
import HeroCarousel from '../components/ui/HeroCarousel';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero */}
      <HeroCarousel />

      {/* Transición suave */}
      <div className="h-16 bg-gradient-to-b from-transparent to-slate-50 -mt-16 relative z-10" />

      {/* Sección Principal - ID agregado para el autoscroll */}
      <section id="contenido-principal" className="bg-slate-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Título y Subtítulo */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-sm font-bold tracking-widest text-[#db2754] uppercase mb-3">
              Nuestra Esencia
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#112e3d] tracking-tight">
              Más que propiedades, <br className="hidden sm:block" /> conectamos historias.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* --- COLUMNA IZQUIERDA: Textos y Valores --- */}
            <div className="lg:col-span-7 space-y-8">
              
              <div>
                <h3 className="text-2xl font-bold text-[#112e3d] mb-4">
                  Trayectoria y Compromiso
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4 text-base sm:text-lg">
                  Pisacco Propiedades nace con la visión de transformar la experiencia del mercado inmobiliario. Fundada y dirigida por Alejo Pisacco, nuestra firma se distingue por ofrecer un asesoramiento integral, ético y altamente personalizado tanto en Santa Fe como en Buenos Aires.
                </p>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  Entendemos que detrás de cada transacción hay un proyecto de vida, una inversión familiar o el sueño de un primer hogar. Por eso, acompañamos a nuestros clientes en cada etapa del proceso, garantizando transparencia y seguridad jurídica en cada operación.
                </p>
              </div>

              <hr className="border-slate-200" />

              {/* Lista de Valores (Reemplaza los bullets simples) */}
              <div className="space-y-6 pt-2">
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#db2754] text-xl border border-slate-100">
                    <FaHandshake />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#112e3d] text-lg">Trato Humano y Directo</h4>
                    <p className="text-slate-500 leading-relaxed mt-1">No somos una franquicia. Brindamos una atención uno a uno, diseñando estrategias comerciales a la medida de cada propiedad.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#db2754] text-xl border border-slate-100">
                    <FaHome />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#112e3d] text-lg">Conocimiento del Mercado</h4>
                    <p className="text-slate-500 leading-relaxed mt-1">Análisis riguroso y tasaciones reales. Conocemos el pulso de los barrios en los que operamos para garantizar el precio justo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#db2754] text-xl border border-slate-100">
                    <FaBalanceScale />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#112e3d] text-lg">Seguridad Legal</h4>
                    <p className="text-slate-500 leading-relaxed mt-1">Operá con la tranquilidad de estar respaldado por un profesional matriculado en múltiples jurisdicciones.</p>
                  </div>
                </div>

              </div>

              {/* Botón CTA */}
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-[#db2754] text-white font-bold py-3.5 px-8 rounded-xl hover:bg-[#c0214a] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  Contactar ahora
                </Link>
              </div>

            </div>

            {/* --- COLUMNA DERECHA: Tarjeta de Presentación --- */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 w-full max-w-sm text-center relative z-10">
                
                {/* Imagen con efecto de aura */}
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-[#db2754] rounded-full blur-xl opacity-20 -m-4"></div>
                  <img
                    src={perfilImage}
                    alt="Alejo Pisacco - Corredor Inmobiliario"
                    className="relative h-48 w-48 rounded-full object-cover shadow-md border-4 border-white mx-auto"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-[#112e3d] mb-1">
                  Alejo Pisacco
                </h3>
                <p className="text-[#db2754] font-bold text-xs uppercase tracking-wider mb-8">
                  Corredor Inmobiliario
                </p>

                {/* Credenciales Legales con estilo limpio */}
                <div className="bg-slate-50 p-5 rounded-2xl text-left border border-slate-100 space-y-4">
                  
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">
                      Colegio Corredores Santa Fe
                    </p>
                    <p className="text-[#112e3d] font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Matrícula N° 1814
                    </p>
                  </div>
                  
                  <hr className="border-slate-200" />
                  
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">
                      Colegio Martilleros Bs. As.
                    </p>
                    <p className="text-[#112e3d] font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      T. I Fº 83 Nº 248 C.M.P.
                    </p>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutUs;
