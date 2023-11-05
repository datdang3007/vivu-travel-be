import { IsNotEmpty, Validate } from 'class-validator';
import { Content } from 'src/content/entities/content.entity';
import { PlaceCategory } from 'src/place-category/entities/place-category.entity';
import { Province } from 'src/province/entities/province.entity';
import { Region } from 'src/region/entities/region.entity';
import { Territory } from 'src/territory/entities/territory.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CreatePlaceDto {
  name: string;
  image: string;
  overview: string;
  contents: Content[];

  region: Region;
  territory: Territory;
  category: PlaceCategory[];

  @IsNotEmpty()
  @Validate(IsExist, ['Province', 'id'], {
    message: 'is not exist',
  })
  province: Province;
}
