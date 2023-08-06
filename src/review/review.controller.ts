import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewModel } from 'src/review/review.model';
import { FindProductDto } from 'src/product/dto/find-product.dto';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @HttpCode(200)
  @Get('byProduct/:productId')
  async getByProduct(@Body('productId') productId: string) {

  }
}
