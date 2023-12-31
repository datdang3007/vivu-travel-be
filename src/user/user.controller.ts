import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('/checkExistEmail/:email')
  async checkExistEmail(@Param('email') email: string) {
    return this.userService.checkExistEmail(email);
  }

  @Public()
  @Get('/find/byRole/:roles')
  async findByRoles(@Param('roles') roles: string) {
    return this.userService.findByRoles(roles);
  }

  @Public()
  @Get('/find/byId/:id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() userData: CreateUserDto) {
    return this.userService.signUp(userData);
  }
}
