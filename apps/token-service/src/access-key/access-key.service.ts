import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessKey } from '../entities/access-key.entity';
import { RateLimitLog } from '../entities/rate-limit-logs.entity';
import {
  SaveAccessKeyInterface,
  DeleteAccessKeyInterface,
  FetchRateLimitLogsInterface,
} from '../interfaces/access-key.interface';

@Injectable()
export class AccessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private accessKeyRepository: Repository<AccessKey>,
    @InjectRepository(RateLimitLog)
    private rateLimitService: Repository<RateLimitLog>,
  ) {}

  async fetchAccessKey(accessKey: string) {
    const res = await this.accessKeyRepository.findOne({
      where: { accessKey },
    });
    return res;
  }

  async saveAccessKey(payload: SaveAccessKeyInterface) {
    const res: AccessKey = await this.accessKeyRepository.save(payload);
    return res;
  }

  async updateAccessKey(payload: SaveAccessKeyInterface) {
    const res = await this.accessKeyRepository.update(
      { accessKey: payload.accessKey },
      payload,
    );
    return res;
  }

  async deleteAccessKey(payload: DeleteAccessKeyInterface) {
    // delete token
    const res = await this.accessKeyRepository.delete({
      accessKey: payload.accessKey,
    });
    return res;
  }

  async saveRateLimitLog(accessKey: string) {
    const payload = {
      accessKey,
      requestedAt: new Date(),
    };
    const res = await this.rateLimitService.save(payload);
    return res;
  }

  async fetchRateLimitLogs(whereQuery: FetchRateLimitLogsInterface) {
    const res = await this.rateLimitService.find({
      where: whereQuery,
    });
    return res;
  }
}
