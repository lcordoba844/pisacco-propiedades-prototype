import { useState } from "react";

interface ImageDropzoneProps {
  onFilesAdded: (files: File[]) => void;
}

export default function ImageDropzone({ onFilesAdded }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Capturamos y filtramos solo las imágenes
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Le avisamos al componente padre mandándole los archivos
    onFilesAdded(imageFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFilesAdded(files);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl transition-colors cursor-pointer
        ${isDragging ? 'border-[#db2754] bg-rose-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}
      `}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className={`w-10 h-10 mb-2 ${isDragging ? 'text-[#db2754]' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        <p className="mb-1 text-sm text-slate-600"><span className="font-semibold">Hacé click para examinar</span> o arrastrá los archivos físicos</p>
        <p className="text-xs text-slate-400">Archivos permitidos: PNG, JPG o WEBP</p>
      </div>
      <input type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="absolute inset-0 cursor-pointer"></label>
    </div>
  );
}
