import { Controller, Get, Post, Query, Body, Req, Res } from '@nestjs/common';
import { MessengersService } from './messengers.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('webhook')
export class MessengersController {
  constructor( 
    private readonly messengersService: MessengersService,
    private readonly configService: ConfigService,
    public PAGE_ACCESS_TOKEN: any,
    
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
    console.log('env', this.configService.get('FB_VERIFY_TOKEN'));
    console.log('receive env', token);
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
    if (body.object === 'page') {
      for (const entry of body.entry) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;
        console.log('sender id', senderId);
        if (event.message && event.message.text) {
          const text = event.message.text;
          await this.messengersService.sendTextMessage(
            senderId,
            `Bạn vừa nhắn: ${text}`,
          );
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    } else {
      return res.sendStatus(404);
    }
  }
}
