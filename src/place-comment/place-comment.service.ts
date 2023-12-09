import { Injectable } from '@nestjs/common';
import { PlaceComment } from './entities/place-comment.entity';
import { CreatePlaceCommentDto } from './dto/create-place-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceCommentRepository } from './place-comment.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PlaceCommentService {
  constructor(
    @InjectRepository(PlaceComment)
    private placeCommentRepository: PlaceCommentRepository,
    private authService: AuthService,
  ) {}

  async create(
    createPlaceCommentDto: CreatePlaceCommentDto,
  ): Promise<PlaceComment> {
    const { creator, ...dataCreate } = createPlaceCommentDto;

    if (!creator) {
      return null;
    }

    const user = await this.authService.findUserByEmail(creator);

    return this.placeCommentRepository.save(
      this.placeCommentRepository.create({
        creator: user,
        ...dataCreate,
      }),
    );
  }

  findAll() {
    return this.placeCommentRepository.find({
      order: { id: 'DESC' },
    });
  }

  findOne(fields: EntityCondition<PlaceComment>): Promise<PlaceComment> {
    return this.placeCommentRepository.findOneOrFail({
      where: fields,
      order: { id: 'DESC' },
    });
  }

  findByPlaceId(id: number): Promise<PlaceComment[]> {
    return this.placeCommentRepository.find({
      where: { place: { id } },
      order: { id: 'DESC' },
    });
  }

  async softRemove(id: number) {
    await this.placeCommentRepository.softRemove({ id });
  }
}
