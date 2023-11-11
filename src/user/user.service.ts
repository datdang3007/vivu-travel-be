import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneOrFail({
      where: {
        email,
      },
    });
  }

  async checkExistEmail(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      return Boolean(user);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.username = createUserDto.username.toLowerCase();
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }
}
