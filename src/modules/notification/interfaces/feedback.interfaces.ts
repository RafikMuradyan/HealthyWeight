export interface IFeedbackNotification {
  id: number;
  content: string;
  fullName: string;
}

export interface IFeedbackHTML {
  content: string;
  fullName: string;
  token: string;
}

export interface ITokenPayload {
  feedbackId: number;
}
