import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  name: string;
}
