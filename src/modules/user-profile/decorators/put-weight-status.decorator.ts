import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { PutWeightStatusDto } from '../dtos';

export function PutWeightStatus(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Put weight status in user profile' }),
    ApiAcceptedResponse({ description: 'Weight status set successfully' }),
    HttpCode(HttpStatus.ACCEPTED),
    ApiBody({ type: PutWeightStatusDto }),
  );
}
