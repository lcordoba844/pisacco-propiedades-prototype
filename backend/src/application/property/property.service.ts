import { NotFoundError } from 'routing-controllers';
import { Sequelize } from 'sequelize-typescript';
import { Service } from 'typedi';

import {
  CreatePropertyRequest,
  PropertyResponse,
  UpdatePropertyRequest,
  UploadedFileDTO,
} from '@/application/property/property.dto';
import { CloudinaryProvider } from '@/infrastructure/providers/cloudinary.providers';
import {
  Coordinates,
  GoogleGeocodingProvider,
} from '@/infrastructure/providers/google-geocoding.provider';
import PropertyImage from '@/models/property-image.model';
import Property from '@/models/property.model';
import ServiceModel from '@/models/service.model';

@Service()
export class PropertyService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly cloudinaryProvider: CloudinaryProvider, // Inyectamos Cloudinary
    private readonly googleGeocodingProvider: GoogleGeocodingProvider,
  ) {}

  public async getAllProperties(): Promise<PropertyResponse[]> {
    const properties = await Property.findAll({
      include: [
        { model: PropertyImage, as: 'imagenes' },
        { model: ServiceModel, as: 'servicios' },
      ],
      order: [['createdAt', 'DESC']],
    });

    return properties.map((property) => this.toResponse(property));
  }

  public async createProperty(
    request: CreatePropertyRequest,
    files?: UploadedFileDTO[],
  ): Promise<PropertyResponse> {
    // Ya no extraemos 'imagenes' del request, porque ahora son archivos físicos
    const { serviciosIds, ...propertyData } = request;
    const coordinates = await this.resolveCoordinates(propertyData);

    // 1. SUBIDA A CLOUDINARY (Fuera de la transacción para no bloquear la base de datos)
    const uploadedUrls: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        // Le pasamos el buffer en crudo y el nombre original a tu proveedor
        const url = await this.cloudinaryProvider.uploadImage(
          file.buffer,
          file.originalname,
        );
        uploadedUrls.push(url);
      }
    }

    // 2. GUARDADO EN BASE DE DATOS
    const result = await this.sequelize.transaction(async (t) => {
      const property = await Property.create(
        { ...propertyData, ...coordinates },
        { transaction: t },
      );

      // Si tenemos URLs exitosas de Cloudinary, las vinculamos
      if (uploadedUrls.length > 0) {
        const imageObjects = uploadedUrls.map((url) => ({
          url,
          propertyId: property.id,
        }));
        await PropertyImage.bulkCreate(imageObjects, { transaction: t });
      }

      if (serviciosIds && serviciosIds.length > 0) {
        await property.$set('servicios', serviciosIds, { transaction: t });
      }

      return property;
    });

    const completeProperty = await this.findProperty(result.id);
    return this.toResponse(completeProperty);
  }

  public async getPropertyById(id: string): Promise<PropertyResponse> {
    const property = await this.findProperty(id);
    return this.toResponse(property);
  }

  public async updateProperty(
    id: string,
    request: UpdatePropertyRequest,
    _files?: UploadedFileDTO[],
  ): Promise<PropertyResponse> {
    const property = await this.findProperty(id);
    // Para simplificar ahora, supongamos que actualiza solo datos planos.
    // La lógica de update de imágenes es más compleja (implica borrar en cloudinary lo que ya no está).
    const { serviciosIds, ...propertyData } = request;
    const coordinates = await this.resolveCoordinates(propertyData);

    await this.sequelize.transaction(async (t) => {
      await property.update(
        { ...propertyData, ...coordinates },
        { transaction: t },
      );

      if (serviciosIds) {
        await property.$set('servicios', serviciosIds, { transaction: t });
      }
    });

    const updatedProperty = await this.findProperty(id);
    return this.toResponse(updatedProperty);
  }

  public async deleteProperty(id: string): Promise<void> {
    const property = await this.findProperty(id);
    // 1. Limpiamos Cloudinary antes de borrar la base de datos
    if (property.imagenes && property.imagenes.length > 0) {
      for (const img of property.imagenes) {
        // Extraemos el public_id de la URL de Cloudinary (ej: pisacco_propiedades/foto1)
        const urlParts = img.url.split('/');
        const folderAndFile = urlParts.slice(-2).join('/');
        const publicId = folderAndFile.split('.')[0];
        await this.cloudinaryProvider.deleteImage(publicId);
      }
    }

    // 2. Eliminamos de la base de datos (Sequelize se encarga de PropertyImage si hay CASCADE)
    await property.destroy();
  }

  private async findProperty(id: string): Promise<Property> {
    const property = await Property.findByPk(id, {
      include: [
        { model: PropertyImage, as: 'imagenes' },
        { model: ServiceModel, as: 'servicios' },
      ],
    });

    if (!property) {
      throw new NotFoundError('Property not found');
    }

    return property;
  }

  private async resolveCoordinates(
    propertyData: Pick<
      CreatePropertyRequest,
      'direccion' | 'ciudad' | 'provincia' | 'lat' | 'lng'
    >,
  ): Promise<Partial<Coordinates>> {
    if (
      typeof propertyData.lat === 'number' &&
      typeof propertyData.lng === 'number'
    ) {
      return {
        lat: propertyData.lat,
        lng: propertyData.lng,
      };
    }

    const coordinates = await this.googleGeocodingProvider.geocodeAddress({
      direccion: propertyData.direccion,
      ciudad: propertyData.ciudad,
      provincia: propertyData.provincia,
    });

    return coordinates || {};
  }

  private toResponse(property: Property): PropertyResponse {
    return {
      id: property.id,
      titulo: property.titulo,
      tipo: property.tipo,
      direccion: property.direccion,
      barrio: property.barrio,
      ciudad: property.ciudad,
      provincia: property.provincia,
      banos: property.banos,
      metros2construidos: property.metros2construidos,
      metros2cubiertos: property.metros2cubiertos,
      metros2semicubiertos: property.metros2semicubiertos,
      ambientes: property.ambientes,
      dormitorios: property.dormitorios,
      antiguedad: property.antiguedad,
      condicion: property.condicion,
      categoriaEdificio: property.categoriaEdificio,
      frenteContrafrente: property.frenteContrafrente,
      alquilerVenta: property.alquilerVenta,
      precio: Number(property.precio),
      tipoMoneda: property.tipoMoneda,
      plantas: property.plantas,
      orientacion: property.orientacion,
      tipoDePiso: property.tipoDePiso,
      cochera: property.cochera,
      lat: property.lat,
      lng: property.lng,
      imagenes: (property.imagenes || []).map((img) => ({
        id: img.id,
        url: img.url,
      })),
      servicios: (property.servicios || []).map((srv) => ({
        id: srv.id,
        name: srv.name,
      })),
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };
  }
}
