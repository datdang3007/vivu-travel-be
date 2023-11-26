import { PartialType } from '@nestjs/swagger';
import { CreatePostDetailDto } from './create-post-detail.dto';

export class UpdatePostDetailDto extends PartialType(CreatePostDetailDto) {}
