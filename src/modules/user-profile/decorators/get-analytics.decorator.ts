import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function GetAnalytics(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get user profile analitycs' }),
    ApiOkResponse({ description: 'Result of users analitics' }),
  );
}
