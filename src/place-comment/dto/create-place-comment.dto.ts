import { IsNotEmpty, Validate } from 'class-validator';
import { Place } from 'src/place/entities/place.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePlaceCommentDto {
  content: string;

  @Validate(IsExist, ['Place', 'id'], {
    message: 'Địa điểm không tồn tại',
  })
  @IsNotEmpty()
  place: Place;

  @Validate(IsExist, ['User', 'email'], {
    message: 'Người dùng không tồn tại',
  })
  @IsNotEmpty()
  creator: string;
}
