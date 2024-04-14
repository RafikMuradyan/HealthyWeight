import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SenderIsNotAdminException } from './../exceptions';
import { telegramAdmins } from 'src/configs';
import { FeedbackService } from 'src/modules/feedback/feedback.service';
import { FeedbackStatus } from 'src/modules/feedback/enums';
import telegramBot from 'src/main';

@Injectable()
export class TelegramListenerService {
  private bot: Telegraf;
  private admins: Array<string>;

  constructor(private readonly feedbackService: FeedbackService) {
    this.bot = telegramBot;
    this.handleCallbackQuery();
    this.bot.launch();
    this.admins = telegramAdmins;
  }

  private handleCallbackQuery(): void {
    this.bot.on('callback_query', async (ctx) => {
      const adminId = String(ctx.callbackQuery.from.id);
      if (!this.admins.includes(adminId)) {
        throw new SenderIsNotAdminException();
      }

      const feedbackId = Number(ctx.callbackQuery['data']);
      if (!feedbackId) {
        await ctx.answerCbQuery('Something went wrong 😕');
      }

      const chatId = ctx.callbackQuery.message.chat.id;
      const messageId = ctx.callbackQuery.message.message_id;
      const confirmResponse =
        await this.feedbackService.confirmFeedbackForTelegram(feedbackId);

      switch (confirmResponse) {
        case FeedbackStatus.ALREADY_CONFIRMED:
          await ctx.answerCbQuery(`Feedback already has been confrmed 😉`);
          break;
        case FeedbackStatus.NOT_FOUND:
          await ctx.answerCbQuery(`Feedback no longer exists 🤔`);
          break;

        case FeedbackStatus.SUCCESS:
          await ctx.answerCbQuery(`Feedback confirmed successfully 🎉`);
          break;

        default:
          await ctx.answerCbQuery('Something went wrong 😕');
          break;
      }

      await this.bot.telegram.deleteMessage(chatId, messageId);
      return;
    });
  }
}
