import { FeedbackStatus } from '../enums';
import { IHTMLDetails } from '../interfaces/html-details.interface';

export type FeedbackStatusLookup = Record<FeedbackStatus, IHTMLDetails>;
