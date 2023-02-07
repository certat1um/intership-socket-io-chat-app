import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //app.useStaticAssets(join(__dirname, '..', 'static'));
  //app.setBaseViewsDir(join(__dirname, '..', 'views'));
  //app.setViewEngine('ejs');

  await app.listen(process.env.APP_PORT, () => {
    console.log('App is listening...');
  });
}
bootstrap();
