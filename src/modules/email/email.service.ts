import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { IEmailDetails } from './interfaces';
import { getTransport } from '../../configs';

@Injectable()
export class EmailService {
  async sendEmail(feedback: IEmailDetails): Promise<boolean> {
    try {
      const transporter: Transporter = getTransport();

      const mailOptions = {
        from: feedback.from,
        to: feedback.to,
        subject: feedback.subject,
        html: feedback.html,
      };

      const info = await transporter.sendMail(mailOptions);

      const isAccepted = !!info.accepted?.length;
      return isAccepted;
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
