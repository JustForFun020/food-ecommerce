import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';

@ObjectType()
@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  name: string;
}
