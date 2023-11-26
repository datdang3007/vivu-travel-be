import { IsNotEmpty, Validate } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePostDetailDto {
  type: number;
  content: string;

  @Validate(IsExist, ['Post', 'id'], {
    message: 'Bài viết không tồn tại',
  })
  @IsNotEmpty()
  post?: Post;
}
