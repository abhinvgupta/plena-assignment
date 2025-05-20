import { NestFactory } from '@nestjs/core';
import { AccessManagementServiceModule } from './access-management-service.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices'
async function bootstrap() {
  const app = await NestFactory.create(AccessManagementServiceModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: { host: 'localhost', port: 6379 },
  });
  
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
