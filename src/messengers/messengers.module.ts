import { Module } from '@nestjs/common';
import { MessengersController } from './messengers.controller';
import { MessengersService } from './messengers.service';

@Module({
  controllers: [MessengersController],
  providers: [MessengersService],
})
export class MessengersModule {}
