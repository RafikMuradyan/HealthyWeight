import { Injectable, NotFoundException } from '@nestjs/common';
import { FEEDBACK_SUBJECT } from './constants';
import { EmailService } from '../email/email.service';
import { JwtService } from '../jwt/jwt.service';
import { IEmailDetails, ISenderInfo } from '../email/interfaces';
import { sendEmailSchema } from '../../utils/joi';
import { InvalidEmailCredentialsException } from '../email/exceptions';
import { TelegramSenderService } from '../telegram/telegram-sender/telegram-sender.service';
import {
  IFeedbackNotification,
  IFeedbackHTML,
  ITokenPayload,
} from './interfaces';
import {
  EmailNotReceivedException,
  MessageNotReceivedException,
} from './exceptions';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly telegramSenderService: TelegramSenderService,
  ) {}

  async sendFeedbackNotification(
    feedback: IFeedbackNotification,
  ): Promise<void> {
    const payload: ITokenPayload = { feedbackId: feedback.id };
    const token = this.jwtService.generateToken(payload);
    const html = this.createFeedbackHTMLBody({
      fullName: feedback.fullName,
      content: feedback.content,
      token,
    });

    const from: ISenderInfo = {
      name: process.env.SENDER_NAME,
      address: process.env.SENDER_EMAIL_ADDRESS,
    };
    const to = [process.env.RECIPIENT1, process.env.RECIPIENT2].filter(Boolean);
    const subject = FEEDBACK_SUBJECT;

    const sendEmailDatils: IEmailDetails = {
      from,
      to,
      subject,
      html,
    };

    const { error } = sendEmailSchema.validate(sendEmailDatils);
    if (error) {
      throw new InvalidEmailCredentialsException(error.message);
    }

    const isEmailAccepted = await this.emailService.sendEmail(sendEmailDatils);
    if (!isEmailAccepted) {
      throw new EmailNotReceivedException();
    }

    // todo, fix problem with telegram bot
    // const isMessageAccepted =
    //   await this.telegramSenderService.sendConfirmationMessage(feedback);
    // if (!isMessageAccepted) {
    //   throw new MessageNotReceivedException();
    // }
  }

  private createConfirmLink(token: string): string {
    const BASE_API = process.env.BASE_API;
    if (!BASE_API) {
      throw new NotFoundException('Base api does not existed');
    }

    const confirmLink = `${process.env.BASE_API}/feedback/confirm/${token}`;
    return confirmLink;
  }

  private createFeedbackHTMLBody(feedback: IFeedbackHTML): string {
    const confirmLink = this.createConfirmLink(feedback.token);
    const buttonHtml = `
    <a
      href="${confirmLink}"
      style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      "
    >
      Confirm Feedback
    </a>`;

    return `
    <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #f9f9f9;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Feedback from ${feedback.fullName}</h1>
          <p>${feedback.content}</p>
          ${buttonHtml}
      </body>
    </html>
  `;
  }
}
