import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { MissingFeedbackIdException } from '../exceptions';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.params.token;

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const decodedToken = this.jwtService.verifyToken(token);

    if (!decodedToken.feedbackId) {
      throw new MissingFeedbackIdException();
    }

    request.tokenData = decodedToken;

    return next.handle();
  }
}
