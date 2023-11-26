import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';

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
      like,
      role: { id: roleId },
    } = user;
    const payload = {
      id,
      email,
      username,
      avatar,
      description,
      like,
      role: roleId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
