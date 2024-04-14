import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { IFeedbackNotification } from '../../notification/interfaces';
import { telegramAdmins, telegramBot } from 'src/configs';
import { MessageSendException } from '../exceptions';

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
        console.log(admin);
        if (!admin) {
          console.log('alooooo');
          await this.bot.telegram.sendMessage(admin, message, {
            reply_markup: keyboard,
            parse_mode: 'MarkdownV2',
          });
        }
      }

      return true;
    } catch (error) {
      throw new MessageSendException();
    }
  }

  private generateMessage(feedback: IFeedbackNotification): string {
    return `
      _*Sender:*_ ${feedback.fullName}\n_*Content:*_ ${feedback.content}\n
    `;
  }
}
