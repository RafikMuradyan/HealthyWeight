import { Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EmailService {
  private generateToken(feedbackId: string): string {
    const token = jwt.sign({ feedbackId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return token;
  }

  private sendConfirmFeedbackEmail(feedbackId: string): void {
    const BASE_API = process.env.BASE_API;
    if (!BASE_API) {
      throw new NotFoundException('Base api does not existed');
    }

    const token = this.generateToken(feedbackId);
    const confirmLink = `${BASE_API}/feedback/confirm?token=${token}`;
    console.log(confirmLink);
  }
}
