import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { IFeedbackNotification } from '../notification/interfaces';
import { SenderIsNotAdmin } from './exceptions';

@Injectable()
export class TelegramService {
  private bot: Telegraf;
  private admins: Array<string>;

  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    this.handleCallbackQuery();
    this.bot.launch();
    this.admins = [process.env.TELEGRAM_ADMIN1, process.env.TELEGRAM_ADMIN2];
  }

  async sendConfirmationMessage(
    feedback: IFeedbackNotification,
  ): Promise<void> {
    try {
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: 'Confirm',
              callback_data: String(11),
            },
          ],
        ],
      };

      const message = this.generateMessage({
        content: 'good',
        id: 1,
        fullName: 'Raf Mur',
      });
      for (const admin of this.admins) {
        await this.bot.telegram.sendMessage(admin, message, {
          reply_markup: keyboard,
          parse_mode: 'MarkdownV2',
        });
      }
    } catch (error) {
      console.error(`Error sending message: ${error.message}`);
    }
  }
  private handleCallbackQuery(): void {
    this.bot.on('callback_query', async (ctx) => {
      const adminId = String(ctx.callbackQuery.from.id);
      if (!this.admins.includes(adminId)) {
        throw new SenderIsNotAdmin();
      }

      const feedbackId = Number(ctx.callbackQuery['data']);
      if (!feedbackId) {
        await ctx.answerCbQuery('Something went wrong 😕');
      }

      const chatId = ctx.callbackQuery.message.chat.id;
      const messageId = ctx.callbackQuery.message.message_id;
      await this.bot.telegram.deleteMessage(chatId, messageId);
      await ctx.answerCbQuery(`Feedback confirmed successfully 🎉`);

      // if (data.startsWith('confirm_feedback_')) {
      //   const feedbackId = parseInt(data.split('_')[2]);
      //   console.log('Feedback ID:', feedbackId);
      //   // Implement your logic to handle the feedback confirmation here
      //   // For example, you can make a request to your backend
      //   // await this.sendConfirmationRequest(feedbackId);
      //   // Send a confirmation message to the user
      //   // await ctx.answerCbQuery('Feedback confirmed');
      // }
    });
  }

  private generateMessage(feedback: IFeedbackNotification) {
    return `
      _*Sender:*_ ${feedback.fullName}\n_*Content:*_ ${feedback.content}\n
    `;
  }
}
