import { injectable } from 'inversify';
//import * as bcryptjs from 'bcryptjs';
// import { Response } from 'express';
import { Arg, Resolver, Mutation } from 'type-graphql';
// import { Mutation } from 'type-graphql'
// import { JwtService } from '@nestjs/jwt';
import jwt from 'jsonwebtoken';
import { LoginInput } from './auth.input'
// import { ResGql } from '../decorators'

// import { User } from "../user/user.entity";

import { Field, ObjectType } from "type-graphql";

@ObjectType()
class LogIn {
  constructor (token: string) {
    this.token = token
  }
  @Field() readonly token: string;
}

@injectable()
@Resolver()
export class AuthResolver {
  constructor(
    // private readonly jwt: JwtService,
  ) {}
  
  //@Mutation(() => User)
  @Mutation(() => LogIn)
  async login(
    @Arg('data') data: LoginInput,
  ) {
    /*
    const user = await this.prisma.client.user({ email });
    if (!user) {
      throw Error('Email or password incorrect');
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw Error('Email or password incorrect');
    }
    */
    const user = {
      id: '123'
    }
    const token = jwt.sign({ id: user.id }, 'mysecret');

    //return user;
    const result = new LogIn(token)
    console.log(result)
    return result
  }

  /*
  @Mutation()
  async signup(
    @Args('signupInput') signupInputDto: SignupInputDto,
    @ResGql() res: Response,
  ) {
    const emailExists = await this.prisma.client.$exists.user({
      email: signupInputDto.email,
    });
    if (emailExists) {
      throw Error('Email is already in use');
    }
    const password = await bcryptjs.hash(signupInputDto.password, 10);

    const user = await this.prisma.client.createUser({ ...signupInputDto, password });

    const jwt = this.jwt.sign({ id: user.id });
    res.cookie('token', jwt, { httpOnly: true });

    return user;
  }
  */
}
