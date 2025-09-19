import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  const appUrl = configService.get('APP_URL');

  const logger = new Logger('Bootstrap');
  await app.listen(port, () => {
    logger.log(`Application is running on port: ${appUrl}`);
    logger.log(`Application is running on port: ${appUrl}/api/auth/reference`);
  });
}
bootstrap();
