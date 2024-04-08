import { HttpStatus, applyDecorators, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export function CreateAppRating(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiCreatedResponse({ description: 'App rating created successfully' }),
    ApiOperation({ summary: 'Create a new rating' }),
  );
}
