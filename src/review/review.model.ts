import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/product.model';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Review extends mongoose.Document {

  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  productId: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
