import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<Review[]> {
    const review = await this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();

    if (review.length === 0) {
      throw new NotFoundException();
    }
    return review
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}
