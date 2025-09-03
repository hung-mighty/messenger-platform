import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    bodyParser.json({
      limit: '125mb',
      verify(req, res, buf: Buffer, encoding: string) {
        if (req.url == '/webhook') {
          req['rawBody'] = buf.toString();
        }
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
