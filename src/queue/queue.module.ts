import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

@Module({
  providers: [
    {
      provide: 'MESSAGE_QUEUE',
      useFactory: (configService: ConfigService) => {
        return new Queue('message-queue', {
          connection: {
            url: configService.get('REDIS_URL'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['MESSAGE_QUEUE'],
})
export class QueueModule {}
