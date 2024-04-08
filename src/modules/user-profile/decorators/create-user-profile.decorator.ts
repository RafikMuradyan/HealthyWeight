import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserProfileDto } from '../dtos';

export function CreateUserProfile(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create new user profile' }),
    ApiBody({ type: CreateUserProfileDto }),
    HttpCode(HttpStatus.CREATED),
    ApiCreatedResponse({ description: 'User profile created successfully' }),
  );
}
