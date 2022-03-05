import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthProvider } from '@package/common';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { UserErrorCode } from './errorCodes';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getById(id: User['id']): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id ${id} not found`,
        UserErrorCode.NOT_FOUND,
      );
    }

    return user;
  }

  async getByEmail(email: User['email']): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(
    email: string,
    hashedPassword: string,
    provider: AuthProvider,
    salt: string,
  ): Promise<User> {
    const user = new User({ email, password: hashedPassword, provider, salt });
    return await this.userRepository.save(user);
  }
}
