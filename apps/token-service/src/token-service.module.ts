import { Module } from '@nestjs/common';
import { TokenServiceController } from './token-service.controller';
import { TokenServiceService } from './token-service.service';
import { QueueConsumerModule } from './queue-consumer/queue-consumer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccessKeyModule } from './access-key/access-key.module';
import { AccessKeyService } from './access-key/access-key.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AccessKeyModule,
    QueueConsumerModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //  database type
      url: process.env.TOKEN_SERVICE_DATABASE_URL,
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Use in development only
    }),
  ],
  controllers: [TokenServiceController],
  providers: [TokenServiceService, AccessKeyService],
})
export class TokenServiceModule {}
