import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');

  const logger = new Logger('bootstrap');
  logger.log('listening on port 3000...');

  await app.listen(3000);
}

bootstrap();