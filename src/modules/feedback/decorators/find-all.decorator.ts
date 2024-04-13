import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function FindAllFeedbacks(): MethodDecorator {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Get paginated list of feedbacks' }),
    ApiOkResponse({ description: 'Paginated list of feedbacks' }),
  );
}
