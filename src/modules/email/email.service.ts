import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import { IEmailDetails } from './interfaces';

@Injectable()
export class EmailService {
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

  async sendEmail(feedback: IEmailDetails) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: feedback.from,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: feedback.from,
        to: feedback.to,
        subject: feedback.subject,
        html: feedback.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
