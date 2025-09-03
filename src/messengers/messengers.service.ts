import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MessengersService {
  private readonly pageAccessToken: any;
  private readonly ollamaApi: any;
  private readonly appSecret: any;
  constructor(private readonly configService: ConfigService) {
    this.pageAccessToken = this.configService.get('PAGE_ACCESS_TOKEN');
    this.ollamaApi = this.configService.get('OLLAMA_URL');
    this.appSecret = this.configService.get('APP_SECRET');
  }
  private readonly apiUrl = 'https://graph.facebook.com/v23.0/me/messages';

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

  async chatWithAI(message: string): Promise<string> {
    const response = await axios.post(`${this.ollamaApi}`, {
      model: 'llama3',
      prompt: message,
      stream: false,
    });
    return response.data?.response ?? 'Xin lỗi, tôi chưa có câu trả lời.';
  }

  verifySignature(req: any) {
    const signature = req.headers['x-hub-signature-256'];
    console.log('signature >>', signature);
    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
      return false;
    }

    const elements = signature.split('=');
    const signatureHash = elements[1];
    const expectedHash = crypto
      .createHmac('sha256', this.appSecret || '')
      .update(req.rawBody)
      .digest('hex');
    console.log('exprectedHash>>', expectedHash);
    if (signatureHash !== expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
    return true;
  }
}
