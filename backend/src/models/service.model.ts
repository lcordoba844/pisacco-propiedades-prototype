import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import PropertyService from '@/models/property-service.model';
import Property from '@/models/property.model';

@Table({
  tableName: 'services',
  timestamps: false,
})
export default class Service extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string; // Ej: "WiFi", "Calefacción"

  @BelongsToMany(() => Property, () => PropertyService)
  properties!: Property[];
}
