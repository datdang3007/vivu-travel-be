import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { EditProfileAuthDto } from './dto/edit-profile-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.userService.findUserByEmail(email);
    return user;
  }

  async login(data: LoginAuthDto) {
    const { email, password } = data;

    // Short check user exist:
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!password) {
      throw new UnauthorizedException();
    }

    // Check correct password:
    const isCorrectPassword = bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    // Login successfully:
    const {
      id,
      username,
      avatar,
      description,
      country,
      like,
      role: { id: roleId },
    } = user;
    const payload = {
      id,
      email,
      username,
      avatar,
      description,
      country,
      like,
      role: roleId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updateRole(user_email: string, role_id: number) {
    const user = await this.userService.findUserByEmail(user_email);
    if (!user) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role: userRole, ...currentData } = user;
    return await this.userService.editProfile(Number(user.id), {
      ...currentData,
      role: {
        id: role_id,
      },
    });
  }

  async editProfile(userId, data: EditProfileAuthDto) {
    const { email } = data;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (Number(user.id) !== Number(userId)) {
      throw new UnauthorizedException();
    }

    const newUser = await this.userService.editProfile(Number(userId), data);

    const {
      id,
      username,
      avatar,
      description,
      country,
      like,
      role: { id: roleId },
    } = newUser;

    const payload = {
      id,
      email,
      username,
      avatar,
      description,
      country,
      like,
      role: roleId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
