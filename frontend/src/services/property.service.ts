import { api } from './api.service';
import type { PropertyResponse } from '../interfaces/property.type';

export const propertyService = {
  getLatestProperties: async (): Promise<PropertyResponse[]> => {
    const response = await api.get<PropertyResponse[]>('/properties');
    return response.data;
  },

  getPropertyById: async (id: string): Promise<PropertyResponse> => {
    const response = await api.get<PropertyResponse>(`/properties/${id}`);
    return response.data;
  },

  createProperty: async (rawFormData: any, imagenes: File[]): Promise<void> => {
    const payload = new FormData();

    // 1. Mapeo de Textos y Ubicación
    payload.append('titulo', rawFormData.titulo);
    payload.append('tipo', rawFormData.tipoPropiedad);
    payload.append('direccion', `${rawFormData.calle} ${rawFormData.altura} ${rawFormData.pisoDepto}`.trim());
    payload.append('descripcion', rawFormData.descripcion);
    payload.append('barrio', 'Centro'); // Default temporal, no está en tu formulario
    payload.append('ciudad', rawFormData.localidad);
    payload.append('provincia', rawFormData.provincia);

    // 2. Mapeo de Números (Los mandamos como string, el backend ahora sabe parsearlos)
    payload.append('banos', rawFormData.banos);
    payload.append('metros2construidos', rawFormData.metrosTotal);
    payload.append('metros2cubiertos', rawFormData.metrosCubiertos);
    payload.append('ambientes', rawFormData.ambientes);
    payload.append('dormitorios', rawFormData.habitaciones);
    payload.append('precio', rawFormData.precio);
    payload.append('plantas', '1'); // Default temporal, no está en tu formulario

    // 3. Transformación de Enum Antigüedad (De string de UI a number de Backend)
    let antiguedadAños = 0;
    if (rawFormData.antiguedad === 'anos_1_5') antiguedadAños = 5;
    if (rawFormData.antiguedad === 'anos_5_20') antiguedadAños = 20;
    if (rawFormData.antiguedad === 'anos_mas_20') antiguedadAños = 30;
    payload.append('antiguedad', String(antiguedadAños));

    // 4. Mapeo de Enums y Categorías
    payload.append('condicion', rawFormData.estadoPublicacion);
    payload.append('frenteContrafrente', rawFormData.disposicion);
    // El backend requiere estrictamente "Venta" o "Alquiler" (Primera letra mayúscula)
    payload.append('alquilerVenta', rawFormData.tipoOperacion === 'venta' ? 'Venta' : 'Alquiler');
    payload.append('tipoMoneda', rawFormData.moneda);

    // 5. Transformación de Cochera (Si el usuario puso 1 o más cocheras, mandamos true)
    payload.append('cochera', Number(rawFormData.cocheras) > 0 ? 'true' : 'false');

    // 6. Inserción de Archivos Físicos
    imagenes.forEach((file) => {
      payload.append('imagenes', file);
    });

    // 7. Envío a la API
    await api.post('/properties', payload);
  },

  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },

  getPropertiesForCards: async () => {
    const properties = await propertyService.getLatestProperties();
    return properties.map(prop => ({
      id: prop.id,
      titulo: prop.titulo,
      ubicacion: `${prop.direccion}, ${prop.ciudad}`,
      imagenPrincipal: prop.imagenes?.[0]?.url || '/fallback.jpg', 
      etiqueta: prop.alquilerVenta
    }));
  }
};
