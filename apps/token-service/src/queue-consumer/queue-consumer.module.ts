import { Module } from '@nestjs/common';
import { QueueConsumerController } from './queue-consumer.controller';
import { AccessKeyModule } from '../access-key/access-key.module';
import { AccessKeyService } from '../access-key/access-key.service';

@Module({
  imports: [AccessKeyModule],
  controllers: [QueueConsumerController],
  providers: [AccessKeyService],
})
export class QueueConsumerModule {}
