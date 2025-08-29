import { Module } from '@nestjs/common';
import { MessengersController } from './messengers.controller';
import { MessengersService } from './messengers.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({
  controllers: [MessengersController],
  providers: [MessengersService],
  imports: [QueueModule]
})
export class MessengersModule {}
