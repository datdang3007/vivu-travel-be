import { IsNotEmpty, Validate } from 'class-validator';
import { PostDetail } from 'src/post-detail/entities/post-detail.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePostDto {
  @Validate(IsExist, ['User', 'email'], {
    message: 'Người dùng không tồn tại',
  })
  @IsNotEmpty()
  creator: string;

  title: string;
  image: string;
  contents: PostDetail[];
}
