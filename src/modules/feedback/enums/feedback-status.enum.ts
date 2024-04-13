import { FeedbackStatusLookup } from '../types';

export enum FeedbackStatus {
  ALREADY_CONFIRMED = 'ALREADY_CONFIRMED',
  NOT_FOUND = 'NOT_FOUND',
  SUCCESS = 'SUCCESS',
}

export enum Colors {
  GREEN = '#23833a',
  RED = '#b61a1f',
  BLUE = '#3b3bad',
}

export enum Messages {
  ALREADY_CONFIRMED = 'Feedback Is Already Confrmed',
  NOT_FOUND = 'Feedback does not exist',
  SUCCESS = 'Feedback Is Confrmed!',
}

export const feedbackStatusLookup: FeedbackStatusLookup = {
  [FeedbackStatus.SUCCESS]: {
    color: Colors.GREEN,
    message: Messages.SUCCESS,
  },
  [FeedbackStatus.ALREADY_CONFIRMED]: {
    color: Colors.BLUE,
    message: Messages.ALREADY_CONFIRMED,
  },
  [FeedbackStatus.NOT_FOUND]: {
    color: Colors.RED,
    message: Messages.NOT_FOUND,
  },
};
