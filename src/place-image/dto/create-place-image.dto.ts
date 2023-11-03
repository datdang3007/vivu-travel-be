import { IsNotEmpty, Validate } from 'class-validator';
import { Place } from 'src/place/entities/place.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePlaceImageDto {
  link: string;

  @Validate(IsExist, ['Place', 'id'], {
    message: 'Địa điểm không tồn tại',
  })
  @IsNotEmpty()
  place: Place;
}
