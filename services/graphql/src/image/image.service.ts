import { injectable, inject } from 'inversify';
import TYPE from '../inversify.types';

import { Repository, getRepository } from "typeorm";

import { Image } from "./image.entity";
import { ImageInput } from "./image.input";

@injectable()
export class ImageService {
  constructor( @inject(TYPE.ImageRepository) private imageRepository: Repository<Image>){}

  public static getRepository(): Repository<Image> {
    return getRepository(Image)
  }
  async createImage(data: ImageInput): Promise<Image> {
    let image = new Image();
    image.title = data.title;

    await this.imageRepository.save(image);

    return image;
  }

  async getImages() {
    return await this.imageRepository.find();
  }

  async page(offset?: number, limit?: number): Promise<[Image[], number]> {
    return this.imageRepository.findAndCount({ 
      where: { 
        // any business logic you might have
      },
      skip: offset,
      take: limit
    })
  }

  async findById(id: string) {
    return this.imageRepository.findOne(id)
  }
}