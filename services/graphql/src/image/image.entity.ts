import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, Int, ID } from "type-graphql";

@ObjectType()
@Entity("image")
export class Image {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { length: 256, unique: true })
  title: string;

  @Field()
  @Column("varchar", { length: 256, unique: true })
  filename: string;

  @Field()
  @Column("varchar", { length: 256, unique: true })
  src: string;
}
