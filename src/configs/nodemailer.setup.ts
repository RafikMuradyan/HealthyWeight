import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export function getTransport(): Transporter {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SENDER_EMAIL_ADDRESS,
      pass: process.env.SENDER_EMAIL_PASS,
    },
  });

  return transporter;
}
