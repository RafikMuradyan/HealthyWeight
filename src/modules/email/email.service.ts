import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { IEmailDetails } from './interfaces';
import { createTransport } from '../../configs';

@Injectable()
export class EmailService {
  async sendEmail(feedback: IEmailDetails): Promise<string> {
    try {
      const transporter: Transporter = createTransport();

      const mailOptions = {
        from: feedback.from,
        to: feedback.to,
        subject: feedback.subject,
        html: feedback.html,
      };

      const info = await transporter.sendMail(mailOptions);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
