import { Injectable, NotFoundException } from '@nestjs/common';
import { IEmailDetails } from './interfaces';
import { createTransport } from 'src/configs';

@Injectable()
export class EmailService {
  async sendEmail(feedback: IEmailDetails) {
    try {
      const transporter = createTransport();

      const mailOptions = {
        from: feedback.from,
        to: ['muradyanrafik1@gmail.com'],
        subject: feedback.subject,
        html: feedback.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
      return info.response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
