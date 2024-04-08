import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function GetUsersCount(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get count of all user profiles' }),
    ApiOkResponse({ description: 'Count of all user profiles' }),
  );
}
