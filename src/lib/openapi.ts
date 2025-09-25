import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

export function buildOpenAPIDoc(app: INestApplication<any>) {
  const doc = new DocumentBuilder()
    .setTitle('NestJS Modern Starter')
    .setDescription('The modern NestJS starter API description')
    .setVersion('1.0')
    .build();

  const openApi = SwaggerModule.createDocument(app, doc);

  return cleanupOpenApiDoc(openApi);
}
