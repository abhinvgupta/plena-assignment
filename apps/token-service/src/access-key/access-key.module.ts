import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKey } from '../entities/access-key.entity';
import { AccessKeyService } from './access-key.service';
import { RateLimitLog } from '../entities/rate-limit-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey, RateLimitLog])],
  providers: [AccessKeyService],
  exports: [AccessKeyService, TypeOrmModule],
})
export class AccessKeyModule {}
