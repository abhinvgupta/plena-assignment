import { Module } from '@nestjs/common';
import { AccessManagementServiceController } from './access-management-service.controller';
import { AccessManagementServiceService } from './access-management-service.service';
import { QueuePubsubModule } from './queue-pubsub/queue-pubsub.module';
import { QueuePubsubService } from './queue-pubsub/queue-pubsub.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccessKey } from './entities/access-key.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    QueuePubsubModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //  database type
      url: process.env.ACCESS_MANAGEMENT_SERVICE_DATABASE_URL,
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Use in development only
    }),
    TypeOrmModule.forFeature([AccessKey]),
  ],
  controllers: [AccessManagementServiceController],
  providers: [AccessManagementServiceService, QueuePubsubService],
})
export class AccessManagementServiceModule {}
