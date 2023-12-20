import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestHeaders = createParamDecorator(
  async (property: string | number | symbol, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    // 사용 예시: @RequestHeaders('content-type')
    if (
      typeof property === 'string' ||
      typeof property === 'number' ||
      typeof property === 'symbol'
    ) {
      return headers[property];
    }

    // 사용 예시: @RequestHeaders()
    return headers;
  },
);
