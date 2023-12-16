import { Injectable } from '@nestjs/common';
import { FILTER_CODE } from 'src/constants/filter.enum';
import { PlaceService } from 'src/place/place.service';
import { ProvinceService } from 'src/province/province.service';
import { RegionService } from 'src/region/region.service';
import { TerritoryService } from 'src/territory/territory.service';
import { PostService } from './../post/post.service';

@Injectable()
export class FilterService {
  constructor(
    private regionService: RegionService,
    private territoryService: TerritoryService,
    private provinceService: ProvinceService,
    private placeService: PlaceService,
    private postService: PostService,
  ) {}

  async searchByName(list, search) {
    return await list.filter((item) => item.name.includes(search));
  }

  async searchByTitle(list, search) {
    return await list.filter((item) => item.title.includes(search));
  }

  async loopPushGeography(result, list, category) {
    list.forEach((val) => {
      const { id, name, image } = val;
      result.push({
        id: id,
        name,
        image,
        category,
      });
    });
  }

  async loopPushPost(result, list, category) {
    list.forEach((val) => {
      const { id, title, image } = val;
      result.push({
        id: id,
        name: title,
        image,
        category,
      });
    });
  }

  async findAll(search: string) {
    const region = await this.regionService.findAll();
    const territory = await this.territoryService.findAll();
    const province = await this.provinceService.findAll();
    const place = await this.placeService.findAll();
    const post = await this.postService.findAll();

    const resultRegion = await this.searchByName(region, search);
    const resultTerritory = await this.searchByName(territory, search);
    const resultProvince = await this.searchByName(province, search);
    const resultPlace = await this.searchByName(place, search);
    const resultPost = await this.searchByTitle(post, search);

    const result = [];
    this.loopPushGeography(result, resultRegion, FILTER_CODE.REGION);
    this.loopPushGeography(result, resultTerritory, FILTER_CODE.TERRITORY);
    this.loopPushGeography(result, resultProvince, FILTER_CODE.PROVINCE);
    this.loopPushGeography(result, resultPlace, FILTER_CODE.PLACE);
    this.loopPushPost(result, resultPost, FILTER_CODE.POST);

    return result;
  }
}
