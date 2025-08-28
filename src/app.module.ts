import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengersModule } from './messengers/messengers.module';

@Module({
  imports: [MessengersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
