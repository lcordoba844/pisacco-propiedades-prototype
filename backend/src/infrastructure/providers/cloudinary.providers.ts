import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import { Service } from 'typedi';

@Service()
export class CloudinaryProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  public async uploadImage(
    imageBuffer: Buffer,
    originalName: string,
  ): Promise<string> {
    try {
      const optimizedBuffer = await sharp(imageBuffer)
        .resize({
          width: 1920,
          height: 1080,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toBuffer();

      const baseName = originalName
        .split('.')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_');

      const cleanName = `${baseName}_${Date.now()}`;

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'pisacco_propiedades',
            resource_type: 'image',
            public_id: cleanName, // USO DEL ORIGINAL NAME PARA SEO
          },
          (error, result) => {
            // SOLUCIÓN AL ERROR DE TYPESCRIPT: Envolvemos en new Error()
            if (error) {
              return reject(new Error(`Fallo en Cloudinary: ${error.message}`));
            }
            if (result) {
              return resolve(result.secure_url);
            }
            reject(new Error('No se recibió resultado de Cloudinary'));
          },
        );

        uploadStream.end(optimizedBuffer);
      });
    } catch (error) {
      console.error('Error procesando o subiendo imagen:', error);
      throw new Error('Fallo la optimización o subida de la imagen');
    }
  }

  public async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error al borrar imagen en Cloudinary:', error);
    }
  }
}
