import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessKeyService } from '../access-key/access-key.service';
import { AccessKey } from '../entities/access-key.entity';
import { MoreThan } from 'typeorm';

@Injectable()
export class AccessKeyInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AccessKeyInterceptor.name);

  constructor(private readonly accessKeyService: AccessKeyService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const accessKey = req.headers['x-access-key'] as string;
    if (!accessKey) {
      throw new ForbiddenException('Missing access key');
    }

    // fetch access key data
    const accessKeyData = await this.accessKeyService.fetchAccessKey(accessKey);
    if (!accessKeyData) {
      throw new ForbiddenException('Invalid access key');
    }

    //  Expiry check
    if (new Date() > new Date(accessKeyData.expiryDate)) {
      throw new ForbiddenException('Access key expired');
    }

    // Rate limit check
    const allowed = await this.checkRateLimit(accessKeyData);
    if (!allowed) {
      this.logger.error('Rate limit exceeded', accessKeyData.accessKey);
      throw new ForbiddenException('Rate limit exceeded');
    }
    this.logger.log('Rate limit check passed', accessKeyData.accessKey);

    // save rate limit log
    await this.accessKeyService.saveRateLimitLog(accessKeyData.accessKey);

    return next.handle();
  }

  private async checkRateLimit(accessKeyData: AccessKey) {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

    const logs = await this.accessKeyService.fetchRateLimitLogs({
      accessKey: accessKeyData.accessKey,
      requestedAt: MoreThan(oneMinuteAgo),
    });
    if (logs && logs.length >= accessKeyData.rateLimitPerMinute) {
      return false;
    }
    return true;
  }
}
