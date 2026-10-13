import ContactForm from "../components/ContactForm";
import HeroCarousel from "../components/ui/HeroCarousel";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero */}
      <HeroCarousel />

      {/* SAME gradient transition as Home */}
      <div className="h-16 bg-gradient-to-b from-transparent to-slate-100 -mt-16 relative z-10" />

      <div id="contenido-principal" className="bg-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#112e3d]">
              Contactanos
            </h1>
            <p className="text-gray-500 mt-2">
              Estamos para ayudarte a encontrar la propiedad ideal
            </p>
          </div>

          {/* Form */}
          <ContactForm />

        </div>
      </div>

    </div>
  );
}
