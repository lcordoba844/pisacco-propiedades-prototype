import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

import Property from '@/models/property.model';
import Service from '@/models/service.model';

@Table({
  tableName: 'property_services',
  timestamps: false,
})
export default class PropertyService extends Model {
  @ForeignKey(() => Property)
  @Column({ field: 'property_id' })
  propertyId!: string;

  @ForeignKey(() => Service)
  @Column({ field: 'service_id' })
  serviceId!: string;
}
