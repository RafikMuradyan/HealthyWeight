import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { IEmailDetails } from './interfaces';
import { getTransport } from '../../configs';
import { EmailSendException } from './exceptions';

@Injectable()
export class EmailService {
  async sendEmail(emailDetails: IEmailDetails): Promise<boolean> {
    try {
      const transporter: Transporter = getTransport();
      const response = await transporter.sendMail(emailDetails);

      const isAccepted = !!response.accepted?.length;
      return isAccepted;
    } catch (error) {
      throw new EmailSendException();
    }
  }
}
