import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { auth } from './lib/auth';
import { AuthGuard, AuthModule } from '@thallesp/nestjs-better-auth';
import { UserModule } from './module/user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    PrismaModule,
    AuthModule.forRoot(auth),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
