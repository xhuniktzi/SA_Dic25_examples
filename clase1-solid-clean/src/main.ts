import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppErrorRestFilter } from './core/infrastructure/filters/app-error.rest.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ctx = app.getHttpAdapter().getInstance();
  app.useGlobalFilters(new AppErrorRestFilter(ctx));
  await app.listen(3000);
}
bootstrap();