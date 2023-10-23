import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';
import { Region } from 'src/region/entities/region.entity';
import { Trim } from 'src/utils/transformers/string.transformers';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreateTerritoryDto {
  name: string;

  @Transform(Trim)
  slogan: string;

  image: string;

  overview: string;

  @IsNotEmpty()
  @Validate(IsExist, ['Region', 'id'], {
    message: 'is not exist',
  })
  region: Region;
}
