import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { Image } from "./image.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService, ImageResolver]
})
export class ImageModule {}
