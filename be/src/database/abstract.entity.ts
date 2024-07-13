import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
