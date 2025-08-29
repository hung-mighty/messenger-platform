import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import OpenAI from 'openai';

@Injectable()
export class MessengersService {
  private readonly pageAccessToken: any;
  private client: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.pageAccessToken = this.configService.get('PAGE_ACCESS_TOKEN');
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
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
        `${this.apiUrl}?access_token=${this.pageAccessToken
          .trim()
          .replace(/^=+/, '')}`,
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

  async chatWithGPT(message: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Bạn là một chatbot hỗ trợ khách hàng.' },
        { role: 'user', content: message },
      ],
    });

    return (
      completion.choices[0].message?.content ??
      'Xin lỗi, tôi chưa có câu trả lời.'
    );
  }
}
