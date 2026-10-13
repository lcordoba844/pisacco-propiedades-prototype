import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Le damos a React 100 milisegundos para que termine de inyectar el HTML de la nueva página
    setTimeout(() => {
      const element = document.getElementById("contenido-principal");
      
      if (element) {
        const yOffset = element.getBoundingClientRect().top + window.scrollY - 80;
        
        window.scrollTo({ top: yOffset, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  }, [pathname]);

  return null;
}
