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
      'chat-message',
      async (job) => {
        const { senderId, text } = job.data;

        const reply = await this.messengersService.chatWithGPT(text);
        console.log('reply>>', reply);
        await this.messengersService.sendTextMessage(senderId, reply);
      },
      {
        connection: {
          url: this.configService.get('REDIS_URL'),
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
