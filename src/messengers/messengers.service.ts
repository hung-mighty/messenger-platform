import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MessengersService {
  private readonly pageAccessToken: any;
  constructor(private readonly configService: ConfigService) {
    this.pageAccessToken = this.configService.get('PAGE_ACCESS_TOKEN');
  }
  private readonly apiUrl = 'https://graph.facebook.com/v2.6/me/messages';

  async sendTextMessage(recipientId: string, message: string) {
    const payload = {
      recipient: { id: recipientId },
      message: { text: message },
    };
    console.log('access_token', this.pageAccessToken);
    try {
      await axios.post(
        `${this.apiUrl}?access_token=${this.pageAccessToken.trim()}`,
        payload,
      );
    } catch (err) {
      console.error(
        'Error sending message:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async sendMessage(senderId, access_token, text) {
    try {
      await axios.post(`${this.apiUrl}?access_token=${access_token}`, {
        recipient: { id: senderId },
        message: { text: text },
      });
    } catch (err) {
      console.error(
        'Error sending message:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }
}
