export interface IFeedbackNotification {
  id: number;
  content: string;
  fullName: string;
}

export interface IDecodedFeedbackToken {
  feedbackId: number;
  iat: number;
  exp: number;
}
