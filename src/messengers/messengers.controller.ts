import { Controller, Get, Post, Query, Body, Req, Res } from '@nestjs/common';
import { MessengersService } from './messengers.service';
import { Response } from 'express';

@Controller('webhook')
export class MessengersController {
  constructor(private readonly messengersService: MessengersService) {}

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    if (mode === 'subscribe' && token === process.env.FB_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    }
    res.sendStatus(403);
  }

  @Post()
  async handleMessage(@Body() body: any, @Res() res: Response) {
    if (body.object === 'page') {
      for (const entry of body.entry) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;

        if (event.message && event.message.text) {
          const text = event.message.text;
          await this.messengersService.sendTextMessage(
            senderId,
            `Bạn vừa nhắn: ${text}`,
          );
        }
      }
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
  }
}
