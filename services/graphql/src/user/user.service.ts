import { injectable, inject } from 'inversify';
import TYPE from '../inversify.types';

import { Repository, getRepository } from "typeorm";

import { User } from "./user.entity";
import { UserInput } from "./user.input";

@injectable()
export class UserService {
  constructor( @inject(TYPE.UserRepository) private userRepository: Repository<User>){}
  public static getRepository(): Repository<User> {
    return getRepository(User)
  }

  async createUser(data: UserInput): Promise<User> {
    let user = new User();
    user.username = data.username;
    user.email = data.email;
    user.firstName = data.firstName;
    user.lastName = data.lastName;

    await this.userRepository.save(user);

    return user;
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async page(offset?: number, limit?: number): Promise<[User[], number]> {
    return this.userRepository.findAndCount({ 
      where: { 
        // any business logic you might have
      },
      skip: offset,
      take: limit
    })
  }

  async findById(id: string) {
    return this.userRepository.findOne(id)
  }

}