import { BadRequestException, Injectable } from '@nestjs/common';
import { suppressNotFoundFailure } from '../../utils/suppressNotFoundFailure';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { AuthErrorCode } from './errorCodes';
import { User } from 'src/entity';
import { MySession } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService, // private formTemplateService: FormTemplateService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await suppressNotFoundFailure(
      this.usersService.getByEmail(email),
    );

    if (!user) {
      return null;
    }

    const isSame = bcrypt.compareSync(pass, user.password);

    if (isSame) {
      const { password, salt, ...result } = user;
      return result as User;
    }

    return null;
  }

  async getUser(id: User['id']): Promise<User> {
    const user = await this.usersService.getById(id);
    const { password: _, salt: __, ...rest } = user;

    return rest as User;
  }

  async register(email: string, password: string): Promise<User> {
    const alreadyExist = await suppressNotFoundFailure(
      this.usersService.getByEmail(email),
    );

    if (alreadyExist) {
      throw new BadRequestException(
        'User already exist',
        AuthErrorCode.USER_ALREADY_EXIST,
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password.trim(), salt);

    const user = await this.usersService.createUser(
      email,
      hash,
      'credentials',
      salt,
    );
    const { password: _, salt: __, ...rest } = user;

    return rest as User;
  }

  async login({ userId }: MySession): Promise<User> {
    const user = await this.usersService.getById(userId);

    // NOTE: Uncomment if we want auto assign afer login
    // if (formTemplatesIds && !!formTemplatesIds.length) {
    //   await this.formTemplateService.assignCreatedFormsAsNotAuthUser(
    //     formTemplatesIds,
    //     user,
    //   );
    // }

    return user;
  }
}
