export interface ISenderInfo {
  address: string;
  name: string;
}

export interface IEmailDetails {
  from: ISenderInfo;
  to: string | string[];
  subject: string;
  html: string;
}
