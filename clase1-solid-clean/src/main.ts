import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppErrorRestFilter } from './core/infrastructure/filters/app-error.rest.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ctx = app.getHttpAdapter().getInstance();
  app.useGlobalFilters(new AppErrorRestFilter(ctx));

   const config = new DocumentBuilder()
    .setTitle('SA Examples - Cats API')
    .setDescription('Clase SA - Ejemplo de API con NestJS')
    .setVersion('1.0')
    .addTag('dogs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();