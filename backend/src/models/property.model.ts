import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

import PropertyImage from '@/models/property-image.model';
import PropertyService from '@/models/property-service.model';
import Service from '@/models/service.model';

// ENUMS requeridos
export enum Orientation {
  NORTE = 'Norte',
  SUR = 'Sur',
  ESTE = 'Este',
  OESTE = 'Oeste',
  NORESTE = 'Noreste',
  NOROESTE = 'Noroeste',
  SURESTE = 'Sureste',
  SUROESTE = 'Suroeste',
}

export enum OperationType {
  VENTA = 'Venta',
  ALQUILER = 'Alquiler',
}

@Table({
  tableName: 'properties',
  timestamps: true,
})
export default class Property extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  titulo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tipo!: string; // Casa, Departamento, etc.

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  direccion!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  barrio!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ciudad!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  provincia!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  banos!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'metros2_construidos',
  })
  metros2construidos!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'metros2_cubiertos',
  })
  metros2cubiertos!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'metros2_semicubiertos',
  })
  metros2semicubiertos?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  ambientes!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  dormitorios!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  antiguedad?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  condicion!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'categoria_edificio',
  })
  categoriaEdificio!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'frente_contrafrente',
  })
  frenteContrafrente!: string;

  @Column({
    type: DataType.ENUM(...Object.values(OperationType)),
    allowNull: false,
    field: 'alquiler_venta',
  })
  alquilerVenta!: OperationType;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  precio!: number;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
    defaultValue: 'USD',
    field: 'tipo_moneda',
  })
  tipoMoneda!: string; // Agregado para separar "USD" del valor numérico

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  plantas!: number;

  @Column({
    type: DataType.ENUM(...Object.values(Orientation)),
    allowNull: true,
  })
  orientacion!: Orientation;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'tipo_de_piso',
  })
  tipoDePiso!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  cochera!: boolean;

  // Localización geográfica (obtenida idealmente desde la API de Maps)
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  lat?: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  lng?: number;

  // RELACIONES
  @HasMany(() => PropertyImage, {
    onDelete: 'CASCADE',
    hooks: true, // Esto le avisa a Sequelize que ejecute el borrado en cadena
  })
  imagenes!: PropertyImage[];

  @BelongsToMany(() => Service, () => PropertyService)
  servicios!: Service[];

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}
