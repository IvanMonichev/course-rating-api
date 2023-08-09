import { IsString } from 'class-validator';


class ProductCharacteristic {
  @IsString()
  name: string;

  value: string;
}

export class Product extends Document {
  image: string;

  title: string;

  price: number;

  oldPrice: number;

  credit: number;

  description: string;

  advantages: string;

  disAdvantages: string;

  categories: string[];

  tags: string;
}
