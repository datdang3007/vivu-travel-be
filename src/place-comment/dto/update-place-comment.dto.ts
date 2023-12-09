import { PartialType } from '@nestjs/swagger';
import { CreatePlaceCommentDto } from './create-place-comment.dto';

export class UpdatePlaceCommentDto extends PartialType(CreatePlaceCommentDto) {}
