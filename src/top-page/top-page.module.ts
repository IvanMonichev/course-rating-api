import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPage, TopPageSchema } from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
  ],
  providers: [TopPageService],
})
export class TopPageModule {}
