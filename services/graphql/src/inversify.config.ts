import { Container } from 'inversify';
import TYPE from './inversify.types'
import { Repository } from "typeorm";

import { AuthResolver } from './auth/auth.resolver'

import { User } from './user/user.entity'
import { UserResolver } from './user/user.resolver'
import { UserService } from './user/user.service'

import { Post } from './post/post.entity'
import { PostResolver } from './post/post.resolver'
import { PostService } from './post/post.service'

import { Image } from './image/image.entity'
import { ImageResolver } from './image/image.resolver'
import { ImageService } from './image/image.service'

const container = new Container();

container.bind<AuthResolver>(AuthResolver).toSelf();

container.bind<UserResolver>(UserResolver).toSelf();
container.bind<UserService>(TYPE.UserService).to(UserService);
container.bind<Repository<User>>(TYPE.UserRepository).toDynamicValue(() => {
  return UserService.getRepository();
}).inRequestScope();

container.bind<PostResolver>(PostResolver).toSelf();
container.bind<PostService>(TYPE.PostService).to(PostService);
container.bind<Repository<Post>>(TYPE.PostRepository).toDynamicValue(() => {
  return PostService.getRepository();
}).inRequestScope();

container.bind<ImageResolver>(ImageResolver).toSelf();
container.bind<ImageService>(TYPE.ImageService).to(ImageService);
container.bind<Repository<Image>>(TYPE.ImageRepository).toDynamicValue(() => {
  return ImageService.getRepository();
}).inRequestScope();

export default container;