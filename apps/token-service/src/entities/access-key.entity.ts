import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RateLimitLog } from './rate-limit-logs.entity';

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

  @Column()
  rateLimitPerMinute: number;

  @OneToMany(() => RateLimitLog, (log) => log.accessKeyRef)
  logs: RateLimitLog[];

  @Column({ type: 'boolean', default: true })
  isEnabled: boolean;
}
