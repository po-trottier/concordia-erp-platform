import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

/**
 * Part entity class used by typeorm
 */
@Entity()
export class Part extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;
}
