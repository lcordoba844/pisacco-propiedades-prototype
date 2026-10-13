import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

export const fileUploadOptions = {
  // Guardamos temporalmente en la memoria RAM (Buffer)
  storage: multer.memoryStorage(),
  // Tipado estricto: req es Request de Express, cb es el callback oficial de Multer
  fileFilter: (
    _req: Request, // Si tenemos mas de un tipo de usuario, lo filtramos aca con la req
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ): void => {
    if (file.mimetype.startsWith('image/')) {
      // Primer parámetro null (sin error), segundo parámetro true (aceptar archivo)
      cb(null, true);
    } else {
      // Rechazamos el archivo enviando un Error al callback
      cb(new Error('Formato de archivo no válido. Solo se permiten imágenes.'));
    }
  },
  limits: {
    fileSize: 30 * 1024 * 1024, // 15 MB de límite por foto original
    files: 30, // Máximo 30 fotos por propiedad
  },
};
