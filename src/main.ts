import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
    
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const sequelize = app.get(Sequelize);
  await sequelize.sync({ alter: true });

  app.useStaticAssets(path.join(__dirname, '..', 'profile_photos'), { prefix: '/profile_photos' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
