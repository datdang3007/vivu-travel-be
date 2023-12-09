import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';
import { EditProfileAuthDto } from './dto/edit-profile-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard)
  @Patch('/update/role')
  updateRole(@Body() data: { user_email: string; role_id: number }) {
    const { user_email, role_id } = data;
    return this.authService.updateRole(user_email, role_id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EditProfileAuthDto) {
    return this.authService.editProfile(id, data);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    if (!req.user) {
      return { message: 'Unauthorized' };
    }
    return req.user;
  }
}
