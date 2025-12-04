import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppErrorGrpcFilter } from './core/infrastructure/filters/app-error.grpc.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'deliveries',
      protoPath: join(__dirname, './proto/deliveries.proto'),
    },
  });

  app.useGlobalFilters(new AppErrorGrpcFilter());

  await app.listen();
}
bootstrap();
