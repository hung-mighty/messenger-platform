import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengersModule } from './messengers/messengers.module';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './queue/queue.module';
// import { RawBodyMiddleware } from './middleware/raw-body.middleware';

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
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(RawBodyMiddleware).forRoutes('*');
  // }
}
