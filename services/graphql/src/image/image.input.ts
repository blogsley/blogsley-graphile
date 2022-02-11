import { Field, InputType } from "type-graphql";

@InputType()
export class ImageInput {
  @Field() readonly title: string;
  @Field() readonly block: string;
  @Field() readonly body: string;
}
