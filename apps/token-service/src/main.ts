import { NestFactory } from '@nestjs/core';
import { TokenServiceModule } from './token-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TokenServiceModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: { host: 'localhost', port: 6379 },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.port ?? 3002);
}
bootstrap();
