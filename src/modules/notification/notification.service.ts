import { Injectable, NotFoundException } from '@nestjs/common';
import { IFeedbackHTML, ITokenPayload } from './interfaces';
import { FEEDBACK_SUBJECT } from './constants';
import { EmailService } from '../email/email.service';
import { JwtService } from '../jwt/jwt.service';
import { IFeedbackNotification } from '../feedback/interfaces';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async sendFeedbackNotification(feedback: IFeedbackNotification) {
    try {
      const jwtPayload: ITokenPayload = { feedbackId: feedback.id };
      const token = this.jwtService.generateToken(jwtPayload);
      console.log(token);

      const BASE_API = process.env.BASE_API;
      if (!BASE_API) {
        throw new NotFoundException('Base api does not existed');
      }

      const confirmLink = `${process.env.BASE_API}/feedback/confirm?token=${token}`;
      const from = process.env.EMAIL_USER;
      const to = process.env.RECIPIENT;
      const subject = FEEDBACK_SUBJECT;
      const html = this.createFeedbackHTMLBody({
        fullName: feedback.fullName,
        content: feedback.content,
        url: confirmLink,
      });

      await this.emailService.sendEmail({ from, to, subject, html });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
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
}
