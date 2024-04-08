import { HttpStatus, applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllAppRating(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get all ratings' }),
    ApiOkResponse({
      description: 'List of rating',
    }),
  );
}
