import { Resolver, Query, Mutation, Arg, ID } from "type-graphql";
import { Post } from "./post.entity";
import { PostService } from "./post.service";
import { PostInput } from "./post.input";

import { RelayedQuery, RelayLimitOffset, RelayLimitOffsetArgs } from 'auto-relay';

import { injectable, inject } from 'inversify';
import TYPE from '../inversify.types';

@injectable()
@Resolver(of => Post)
export class PostResolver {
  constructor(@inject(TYPE.PostService) private readonly postService: PostService) {}

  @RelayedQuery(() => Post)
  async allPosts(
    @RelayLimitOffset() {limit, offset}: RelayLimitOffsetArgs
  ): Promise<[Post[], number]> {
    return this.postService.page(offset, limit)
  }

  @Mutation(() => Post)
  async createPost(@Arg("data") data: PostInput) {
    return this.postService.createPost(data);
  }

  @Query(returns => Post)
  async post(@Arg("id", type => ID) id: string) {
    const post = await this.postService.findById(id);
    /* if (post === undefined) {
      throw new PostNotFoundError(id);
    } */
    return post;
  }
}
