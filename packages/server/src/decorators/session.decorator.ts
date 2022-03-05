import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyNotProtectedSession, MySession } from 'src/types';
import { MyContext } from '../types/myContext';

export const Session = createParamDecorator(
  (
    _data: unknown,
    context: ExecutionContext,
  ): Promise<MySession | MyNotProtectedSession> => {
    const ctx = GqlExecutionContext.create(context).getContext() as MyContext;

    // @ts-ignore
    return ctx.req.session;
  },
);
