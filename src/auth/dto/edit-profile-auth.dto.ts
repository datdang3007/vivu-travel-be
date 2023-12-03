import { IsEmail, IsNotEmpty } from 'class-validator';

export class EditProfileAuthDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  description: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  avatar: string;
}
