import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { IFeedbackNotification } from '../../notification/interfaces';
import { telegramAdmins } from 'src/configs';
import { MessageSendException } from '../exceptions';
import telegramBot from 'src/main';

@Injectable()
export class TelegramSenderService {
  private bot: Telegraf;
  private admins: Array<string>;

  constructor() {
    this.bot = telegramBot;
    this.admins = telegramAdmins;
  }

  async sendConfirmationMessage(
    feedback: IFeedbackNotification,
  ): Promise<boolean> {
    try {
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: 'Confirm',
              callback_data: String(feedback.id),
            },
          ],
        ],
      };

      const message = this.generateMessage(feedback);
      for (const admin of this.admins) {
        await this.bot.telegram.sendMessage(admin, message, {
          reply_markup: keyboard,
          parse_mode: 'MarkdownV2',
        });
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new MessageSendException();
    }
  }

  private generateMessage(feedback: IFeedbackNotification): string {
    return `
      _*Sender:*_ ${feedback.fullName}\n_*Content:*_ ${feedback.content}\n
    `;
  }
}
