import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { Role } from 'src/constants/role.enum';
import { DeepPartial, In } from 'typeorm';

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

  async findByRoles(roles: string): Promise<User[] | undefined> {
    const listRole = roles.split(',');
    return this.userRepository.find({
      where: {
        role: {
          id: In(listRole),
        },
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
    return this.userRepository.save(
      this.userRepository.create({ ...createUserDto, role: { id: Role.User } }),
    );
  }

  async editProfile(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | undefined> {
    const { email } = payload;
    await this.userRepository.update({ id }, payload);
    return this.userRepository.findOneOrFail({
      where: { email },
    });
  }
}
