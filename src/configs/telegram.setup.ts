import { Telegraf } from 'telegraf';

const a = process.env.TELEGRAM_BOT_TOKEN;
console.log(a, '11111111111111111111111');
export const telegramBot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
export const telegramAdmins: Array<string> = [
  process.env.TELEGRAM_ADMIN1,
  process.env.TELEGRAM_ADMIN2,
].filter(Boolean);
