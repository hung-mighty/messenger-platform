import { Module } from '@nestjs/common';
import { MessengersController } from './messengers.controller';
import { MessengersService } from './messengers.service';
import { QueueModule } from 'src/queue/queue.module';
import { MessageProcessor } from 'src/queue/message.processor';

@Module({
  controllers: [MessengersController],
  providers: [MessengersService, MessageProcessor],
  imports: [QueueModule]
})
export class MessengersModule {}
