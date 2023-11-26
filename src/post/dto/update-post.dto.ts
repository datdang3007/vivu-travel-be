import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  status: number;

  @Validate(IsExist, ['User', 'email'], {
    message: 'Người dùng không tồn tại',
  })
  @IsNotEmpty()
  censor: string;
}
