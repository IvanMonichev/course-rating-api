import { IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5, { message: 'Рейтинг не может быть более 5' })
  @Min(1, { message: 'Рейтинг не может быть менее 1' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
