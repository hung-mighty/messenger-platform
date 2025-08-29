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
            host: configService.get('REDIS_HOST') || 'localhost',
            port: Number(configService.get('REDIS_PORT')) || 6379,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['MESSAGE_QUEUE'],
})
export class QueueModule {}
