import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  readonly username: string;

  @Field()
  // @MinLength(6)
  readonly password: string;
}

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  // @MinLength(6)
  readonly password: string;
}