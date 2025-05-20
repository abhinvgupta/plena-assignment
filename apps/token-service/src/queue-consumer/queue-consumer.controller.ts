import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AccessKeyService } from '../access-key/access-key.service';
@Controller()
export class QueueConsumerController {
  private readonly logger = new Logger(QueueConsumerController.name);

  constructor(private readonly accessKeyService: AccessKeyService) {}

  @EventPattern('accessKeyCreated')
  async handleKeyCreated(@Payload() data: any) {
    this.logger.log('Key created event received:', data);
    // Update local db with key info
    try {
      await this.accessKeyService.saveAccessKey(data);
    } catch (error) {
      console.error('Error saving key:', error);
    }
  }

  @EventPattern('accessKeyUpdated')
  async handleKeyUpdated(@Payload() data: any) {
    this.logger.log('Key updated event received:', data);
    // Update local db with key info
    try {
      await this.accessKeyService.updateAccessKey(data);
    } catch (error) {
      console.error('Error updating key:', error);
    }
  }

  @EventPattern('accessKeyDeleted')
  async handleKeyDeleted(@Payload() data: any) {
    this.logger.log('Key deleted event received:', data);
    // Update local db with key info
    try {
      await this.accessKeyService.deleteAccessKey(data);
    } catch (error) {
      console.error('Error deleting key:', error);
    }
  }
}
