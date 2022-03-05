import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { MyContext } from '../types/myContext';
import { MySession } from '../types/session';

export class SessionGuard extends AuthGuard('session') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.session as MySession;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext() as MyContext;
    // @ts-ignore
    return !!ctx.req.session.userId;
  }
}
