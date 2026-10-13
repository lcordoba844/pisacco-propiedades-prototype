export interface PropertyImage {
  id: string;
  url: string;
}

export interface PropertyService {
  id: string;
  name: string;
}

export interface CreatePropertyRequest {
  titulo: string;
  tipo: string;
  direccion: string;
  barrio?: string; // Opcional
  ciudad: string;
  provincia: string;
  banos: number;
  metros2construidos: number;
  metros2cubiertos: number;
  ambientes: number;
  dormitorios: number;
  condicion: string;
  categoriaEdificio: string;
  frenteContrafrente: string;
  alquilerVenta: 'Venta' | 'Alquiler';
  precio: number;
  tipoMoneda: string;
  plantas: number;
  orientacion: string;
  tipoDePiso: string;
  cochera: boolean;
  imagenes: string[]; // Por ahora mandamos un array vacío de strings
  serviciosIds: string[]; // Por ahora mandamos un array vacío de IDs
}

export interface PropertyResponse {
  id: string;
  titulo: string;
  tipo: string;
  direccion: string;
  descripcion?: string;
  barrio: string;
  ciudad: string;
  provincia: string;
  banos: number;
  metros2construidos: number;
  metros2cubiertos: number;
  metros2semicubiertos?: number; // Opcional
  ambientes: number;
  dormitorios: number;
  antiguedad?: number; // Opcional
  condicion: string;
  categoriaEdificio: string;
  frenteContrafrente: string;
  alquilerVenta: 'Venta' | 'Alquiler';
  precio: number;
  tipoMoneda: string;
  plantas: number;
  orientacion: string;
  tipoDePiso: string;
  cochera: boolean;
  lat?: number; // Opcional, para el mapa
  lng?: number; // Opcional, para el mapa
  imagenes: PropertyImage[];
  servicios: PropertyService[];
  createdAt: string; // O Date si lo parseas
  updatedAt: string;
}
