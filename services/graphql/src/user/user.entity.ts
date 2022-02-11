import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

import { hashPasswordSync } from '../security';

@ObjectType()
@Entity("user")
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { length: 256, unique: true })
  username: string;

  @Field()
  @Column("varchar", { length: 256, unique: true })
  password: string;

  @Field()
  @Column("varchar", { length: 256 })
  email: string;

  @Field()
  @Column("varchar", { length: 256 })
  firstName: string;

  @Field()
  @Column("varchar", { length: 256 })
  lastName: string;

  async setPassword(value: string) {
    this.password = hashPasswordSync(value);
  }
}
