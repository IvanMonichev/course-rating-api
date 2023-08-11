import { IsArray, IsNumber, IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';


class ProductCharacteristicDTO {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateProductDto {

  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disAdvantages: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({each: true})
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDTO)
  characteristics: ProductCharacteristicDTO[];
}
