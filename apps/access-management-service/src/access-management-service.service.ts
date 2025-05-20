import { Injectable } from '@nestjs/common';
import { QueuePubsubService } from './queue-pubsub/queue-pubsub.service';
import { CreateAccessKeyDto } from './dtos/access-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessKey } from './entities/access-key.entity';
import { DeleteAccessKeyInterface } from './interfaces/access-key.interface';

@Injectable()
export class AccessManagementServiceService {
  constructor(
    private readonly queuePubsubService: QueuePubsubService,
    @InjectRepository(AccessKey)
    private accessKeyRepository: Repository<AccessKey>,
  ) {}
  async saveAccessKey(payload: CreateAccessKeyDto): Promise<AccessKey> {
    const accessKey = {
      accessKey: payload.accessKey,
      expiryDate: payload.expiryDate,
      rateLimitPerMinute: payload.rateLimitPerMinute,
    };
    const res: AccessKey = await this.accessKeyRepository.save(accessKey);

    this.queuePubsubService.publishMessage('accessKeyCreated', accessKey);
    return res;
  }

  async updateAccessKey(
    payload: CreateAccessKeyDto,
  ): Promise<{ message: string }> {
    const accessKeyUpdate = {
      accessKey: payload.accessKey,
      expiryDate: payload.expiryDate,
      rateLimitPerMinute: payload.rateLimitPerMinute,
      isEnabled: payload.isEnabled,
    };
    const res = await this.accessKeyRepository.update(
      { accessKey: payload.accessKey },
      accessKeyUpdate,
    );
    if (res.affected > 0) {
      this.queuePubsubService.publishMessage(
        'accessKeyUpdated',
        accessKeyUpdate,
      );
      return { message: 'Access key updated successfully' };
    }

    return { message: 'Access key update failed' };
  }

  async deleteAccessKey(
    payload: DeleteAccessKeyInterface,
  ): Promise<{ message: string }> {
    const res = await this.accessKeyRepository.delete({
      accessKey: payload.accessKey,
    });

    if (res.affected > 0) {
      this.queuePubsubService.publishMessage('accessKeyDeleted', payload);

      return { message: 'Access key deletion successfully' };
    }

    return { message: 'Access key delete failed' };
  }

  async fetchAccessKey(accessKey: string): Promise<AccessKey> {
    const res = await this.accessKeyRepository.findOne({
      where: { accessKey },
    });
    return res;
  }

  async fetchAllAccessKey(): Promise<AccessKey[]> {
    const res = await this.accessKeyRepository.find();
    return res;
  }
}
