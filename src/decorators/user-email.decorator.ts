import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
})
