import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { TokenInterceptor } from 'src/modules/jwt/interceptors';

export function ConfirmFeedbackDecorator(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    UseInterceptors(TokenInterceptor),
    ApiOperation({ summary: 'Confirm feedback' }),
    ApiParam({ name: 'token', description: 'Feedback token', required: true }),
  );
}
