import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengersModule } from './messengers/messengers.module';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';
import * as express from 'express';
import { MessengersController } from './messengers/messengers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessengersModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        express.json({
          verify: (req: any, res, buf) => {
            req.rawBody = buf.toString();
          },
        }),
      )
      .forRoutes(MessengersController);
  }
}
