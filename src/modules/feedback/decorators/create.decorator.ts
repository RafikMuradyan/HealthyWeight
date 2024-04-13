import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateFeedbackDto } from '../dtos';

export function CreateFeedback(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiBody({ type: CreateFeedbackDto }),
    ApiOperation({ summary: 'Create a new feedback' }),
    ApiCreatedResponse({ description: 'Feedback was sent successfully' }),
  );
}
