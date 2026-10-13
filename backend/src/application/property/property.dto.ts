import { Type, Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

import { Orientation, OperationType } from '@/models/property.model';

export class CreatePropertyRequest {
  @IsString()
  titulo!: string;

  @IsString()
  tipo!: string;

  @IsString()
  direccion!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  barrio!: string;

  @IsString()
  ciudad!: string;

  @IsString()
  provincia!: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number) // Convierte el string del FormData a Number
  banos!: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  metros2construidos!: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  metros2cubiertos!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  metros2semicubiertos?: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  ambientes!: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  dormitorios!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  antiguedad?: number;

  @IsOptional()
  @IsString()
  condicion!: string;

  @IsOptional()
  @IsString()
  categoriaEdificio!: string;

  @IsOptional()
  @IsString()
  frenteContrafrente!: string;

  @IsEnum(OperationType)
  alquilerVenta!: OperationType;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  precio!: number;

  @IsOptional()
  @IsString()
  tipoMoneda?: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  plantas!: number;

  @IsOptional()
  @IsEnum(Orientation)
  orientacion!: Orientation;

  @IsOptional()
  @IsString()
  tipoDePiso!: string;

  @IsBoolean()
  // FormData manda "true" o "false" como strings. Transform lo pasa a booleano real.
  @Transform(
    ({ value }) =>
      value === 'true' || value === true || value === 1 || value === '1',
  )
  cochera!: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lat?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  lng?: number;

  // ELIMINAMOS @IsUrl() y @IsString() de imagenes porque ahora viajan por Multer, no por el Body JSON.
  // Solo lo dejamos opcional por si la lógica interna lo usa, pero no se valida en la entrada HTTP.
  @IsOptional()
  @IsArray()
  imagenes?: string[];

  // Lo hacemos opcional temporalmente hasta que conectemos los checkboxes de amenities en el frontend
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  serviciosIds?: string[];
}

export class UpdatePropertyRequest extends CreatePropertyRequest {}

export class ServiceResponse {
  id!: string;
  name!: string;
}

export class ImageResponse {
  id!: string;
  url!: string;
}

export interface UploadedFileDTO {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

export class PropertyResponse {
  id!: string;
  titulo!: string;
  tipo!: string;
  direccion!: string;
  descripcion?: string;
  barrio!: string;
  ciudad!: string;
  provincia!: string;
  banos!: number;
  metros2construidos!: number;
  metros2cubiertos!: number;
  metros2semicubiertos?: number;
  ambientes!: number;
  dormitorios!: number;
  antiguedad?: number;
  condicion!: string;
  categoriaEdificio!: string;
  frenteContrafrente!: string;
  alquilerVenta!: OperationType;
  precio!: number;
  tipoMoneda!: string;
  plantas!: number;
  orientacion!: Orientation;
  tipoDePiso!: string;
  cochera!: boolean;
  lat?: number;
  lng?: number;
  imagenes!: ImageResponse[];
  servicios!: ServiceResponse[];
  createdAt!: Date;
  updatedAt!: Date;
}
