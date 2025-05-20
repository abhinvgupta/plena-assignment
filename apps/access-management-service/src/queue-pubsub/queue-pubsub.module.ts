import { Module } from '@nestjs/common';
import { QueuePubsubService } from './queue-pubsub.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_CLIENT',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  providers: [QueuePubsubService],
  exports: [QueuePubsubService, ClientsModule],
})
export class QueuePubsubModule {}
