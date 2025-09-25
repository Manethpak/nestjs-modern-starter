import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { apiReference } from '@scalar/nestjs-api-reference';
import { buildOpenAPIDoc } from './lib/openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.setGlobalPrefix('api');
  app.use(
    '/api/reference',
    apiReference({
      content: buildOpenAPIDoc(app),
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3000);
  const appUrl = configService.get('APP_URL');

  const logger = new Logger('Bootstrap');
  await app.listen(port, () => {
    logger.log(`Application is running on port: ${appUrl}`);
    logger.log(`Application OpenAPI is available: ${appUrl}/api/reference`);
    logger.log(`Auth OpenAPI is available: ${appUrl}/api/auth/reference`);
  });
}
bootstrap();
