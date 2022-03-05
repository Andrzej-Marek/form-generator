import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { Session } from 'src/decorators';
import { User } from 'src/entity/User.entity';
import { LocalAuthGuard, SessionGuard } from 'src/guards';
import { MySession } from 'src/types/session';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(SessionGuard)
  @Query(() => String)
  async protected(@Session() session: MySession): Promise<string> {
    return session.userId;
  }

  @UseGuards(SessionGuard)
  @Query(() => User)
  async me(@Session() session: MySession): Promise<User> {
    return await this.authService.getUser(session.userId);
  }

  @Mutation(() => User)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('email') _email: string,
    @Args('password') _password: string,
    @Session() session: MySession,
  ) {
    return await this.authService.login(session);
  }

  @Mutation(() => User)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.register(email, password);
  }
}
