import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { Product } from '../productEntity/product.entity';
import { User } from '../userEntity/user.entity';

@Entity()
@ObjectType()
export class Rate extends AbstractEntity<Rate> {
  @Column()
  @Field()
  score: number;

  @Column()
  @Field()
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.rates)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.rates)
  @Field(() => Product)
  product: Product;
}
