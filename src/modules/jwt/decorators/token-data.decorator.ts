import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* eslint-disable @typescript-eslint/naming-convention */
export const TokenData = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.tokenData;
});
