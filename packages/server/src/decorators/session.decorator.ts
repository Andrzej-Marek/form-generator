import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entity/User.entity';
import { MyContext } from '../types/myContext';

export const Session = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Promise<User> => {
    const ctx = GqlExecutionContext.create(context).getContext() as MyContext;

    // @ts-ignore
    return ctx.req.session;
  },
);
