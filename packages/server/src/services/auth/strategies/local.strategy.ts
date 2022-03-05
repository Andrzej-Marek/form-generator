import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { MyContext } from 'src/types/myContext';
import { AuthErrorCode } from '../errorCodes';
import { User } from 'src/entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    context: MyContext,
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
        AuthErrorCode.INVALID_CREDENTIALS,
      );
    }

    // @ts-ignore
    context.req.session.userId = user.id;

    return user;
  }
}
