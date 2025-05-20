import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class QueuePubsubService {
  constructor(@Inject('REDIS_CLIENT') private readonly client: ClientProxy) {}
  publishMessage(key: string, data: any): void {
    this.client.emit(key, data);
  }
}
