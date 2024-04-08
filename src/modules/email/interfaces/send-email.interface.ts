export interface IEmailDetails {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}
