import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('access_keys')
export class AccessKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  accessKey: string;

  @Column()
  expiryDate: Date;

  @Column({ default: 20 })
  rateLimitPerMinute: number;

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;
}
