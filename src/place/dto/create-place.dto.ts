import { IsNotEmpty, Validate } from 'class-validator';
import { Province } from 'src/province/entities/province.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePlaceDto {
  name: string;
  image: string;
  overview: string;

  @IsNotEmpty()
  @Validate(IsExist, ['Province', 'id'], {
    message: 'is not exist',
  })
  province: Province;
}
