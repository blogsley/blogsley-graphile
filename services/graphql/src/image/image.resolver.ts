import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Image } from "./image.entity";
import { ImageService } from "./image.service";
import { ImageInput } from "./image.input";

import { RelayedQuery, RelayLimitOffset, RelayLimitOffsetArgs } from 'auto-relay';

import { injectable, inject } from 'inversify';
import TYPE from '../inversify.types';

@injectable()
@Resolver(of => Image)
export class ImageResolver {
  constructor(@inject(TYPE.ImageService) private readonly imageService: ImageService) {}

  @RelayedQuery(() => Image)
  async allImages(
    @RelayLimitOffset() {limit, offset}: RelayLimitOffsetArgs
  ): Promise<[Image[], number]> {
    return this.imageService.page(offset, limit)
  }

  @Mutation(() => Image)
  async createImage(@Arg("data") data: ImageInput) {
    return this.imageService.createImage(data);
  }

  @Query(returns => Image)
  async image(@Arg("id", type => ID) id: string) {
    const image = await this.imageService.findById(id);
    /* if (image === undefined) {
      throw new ImageNotFoundError(id);
    } */
    return image;
  }
}
