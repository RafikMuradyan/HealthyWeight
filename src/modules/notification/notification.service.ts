import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { IFeedback, IFeedbackHTML } from './interfaces';
import { FEEDBACK_SUBJECT } from './constants';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationService {
  constructor(private readonly emailService: EmailService) {}

  private generateToken(feedbackId: number): string {
    const token = jwt.sign({ feedbackId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return token;
  }

  private sendConfirmFeedbackEmail(feedbackId: number): void {
    const BASE_API = process.env.BASE_API;
    if (!BASE_API) {
      throw new NotFoundException('Base api does not existed');
    }

    const token = this.generateToken(feedbackId);
    const confirmLink = `${BASE_API}/feedback/confirm?token=${token}`;
    console.log(confirmLink);
  }

  private createFeedbackHTMLBody(feedback: IFeedbackHTML) {
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
           <button class="button" id='apiForm'>Confirm Feedback</button>
        </div>
        <script>
         document.getElementById('apiForm').addEventListener('click', function() {
        fetch(${feedback.url})
        </script>
      </body>
    </html>
  `;
  }

  async sendFeedbackNotification(feedback: IFeedback) {
    try {
      const { fullName, content } = feedback;
      const token = this.generateToken(feedback.id);

      const confirmLink = `${process.env.BASE_API}/feedback/confirm?token=${token}`;
      const from = process.env.EMAIL_USER;
      const to = process.env.RECIPIENT;
      const subject = FEEDBACK_SUBJECT;
      const html = this.createFeedbackHTMLBody({
        fullName,
        content,
        url: confirmLink,
      });
      console.log(confirmLink, 'confirmLinkconfirmLink');
      await this.emailService.sendEmail({ from, to, subject, html });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
