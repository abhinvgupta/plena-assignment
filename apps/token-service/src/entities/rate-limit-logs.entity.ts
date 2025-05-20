import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AccessKey } from './access-key.entity';

@Entity('rate_limit_logs')
export class RateLimitLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  accessKey: string;

  @ManyToOne(() => AccessKey, (accessKey) => accessKey.logs)
  @JoinColumn({ name: 'accessKey', referencedColumnName: 'accessKey' })
  accessKeyRef: AccessKey;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestedAt: Date;
}
