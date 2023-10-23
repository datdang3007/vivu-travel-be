import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Territory } from './../../territory/entities/territory.entity';
import { Region } from 'src/region/entities/region.entity';

export class CreateProvinceDto {
  name: string;
  image: string;
  overview: string;

  region: Region;

  @IsNotEmpty()
  @Validate(IsExist, ['Territory', 'id'], {
    message: 'is not exist',
  })
  territory: Territory;
}
