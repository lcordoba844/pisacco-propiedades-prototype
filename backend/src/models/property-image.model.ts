import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import Property from '@/models/property.model';

@Table({
  tableName: 'property_images',
  timestamps: true,
})
export default class PropertyImage extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(2048),
    allowNull: false,
  })
  url!: string;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'property_id',
  })
  propertyId!: string;

  @BelongsTo(() => Property)
  property!: Property;
}
