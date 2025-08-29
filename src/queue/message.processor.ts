import { Injectable, OnModuleInit } from '@nestjs/common';
import { Worker } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { MessengersService } from '../messengers/messengers.service';

@Injectable()
export class MessageProcessor implements OnModuleInit {
  constructor(
    private readonly messengersService: MessengersService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const worker = new Worker(
      'message-queue',
      async (job) => {
        const { senderId, text } = job.data;

        const reply = await this.messengersService.chatWithGPT(text);

        await this.messengersService.sendTextMessage(senderId, reply);
      },
      {
        connection: {
          host: this.configService.get('REDIS_HOST') || 'localhost',
          port: Number(this.configService.get('REDIS_PORT')) || 6379,
        },
      },
    );

    worker.on('completed', (job) => {
      console.log(`Job ${job.id} done`);
    });

    worker.on('failed', (job, err) => {
      console.error(`Job ${job?.id} failed:`, err);
    });
  }
}
