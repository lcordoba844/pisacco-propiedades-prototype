import type { FC } from "react";

interface SpinnerProps {
  texto?: string; 
}

const Spinner: FC<SpinnerProps> = ({ texto = "Cargando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <svg className="animate-spin h-10 w-10 text-[#db2754] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
         <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25"></circle>
         <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-[#112e3d] font-semibold tracking-wide">{texto}</p>
    </div>
  );
};

export default Spinner;
