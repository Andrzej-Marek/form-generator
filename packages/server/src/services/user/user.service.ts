import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/User.entity';
import { PublicId } from '../../types/publicId';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getByUserId(userId: PublicId): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(
    email: string,
    hashedPassword: string,
    salt: string,
  ): Promise<User> {
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      salt,
    });

    return await this.userRepository.save(user);
  }
}
