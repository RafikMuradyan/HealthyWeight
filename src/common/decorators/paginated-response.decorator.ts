import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDto } from '../dtos';

/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type */
export const ApiPaginatedResponse = () => {
  return applyDecorators(
    ApiExtraModels(PageDto),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
              },
            },
          },
        ],
      },
    }),
  );
};
