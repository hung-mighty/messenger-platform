import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MessengersService {
  private readonly apiUrl = 'https://graph.facebook.com/v19.0/me/messages';
  private readonly pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

  async sendTextMessage(recipientId: string, message: string) {
    const payload = {
      recipient: { id: recipientId },
      message: { text: message },
    };

    try {
      await axios.post(
        `${this.apiUrl}?access_token=${this.pageAccessToken}`,
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
}
