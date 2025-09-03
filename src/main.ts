import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    express.json({
      limit: '125mb',
      verify: (req: any, res, buf) => {
        if (req.url == 'webhook') {
          req['rawBody'] = buf.toString();
        }
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
