import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

export function getTransport(): Transporter {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}
