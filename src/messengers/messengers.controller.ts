import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import { MessengersService } from './messengers.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

@Controller('webhook')
export class MessengersController {
  private PAGE_ACCESS_TOKEN: any;

  constructor(
    @Inject('MESSAGE_QUEUE') private messageQueue: Queue,
    private readonly messengersService: MessengersService,
    private readonly configService: ConfigService,
  ) {
    this.PAGE_ACCESS_TOKEN = this.configService.get('PAGE_ACCESS_TOKEN');
  }

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    if (
      mode === 'subscribe' &&
      token === this.configService.get('FB_VERIFY_TOKEN')
    ) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
  }

  @Post()
  async handleMessage(@Body() body: any, @Res() res: Response) {
    console.log('body>>', JSON.stringify(body,null,2 ));
    if (body.object === 'page') {
      for (const entry of body.entry) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;
        if (event.message && event.message.text) {
          const text = event.message.text;
          await this.messageQueue.add('chat-message', {
            senderId,
            text,
          });
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    } else {
      return res.sendStatus(404);
    }
  }
}
