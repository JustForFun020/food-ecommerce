import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { AbstractEntity } from 'src/database/abstract.entity';
import { Product } from '../productEntity/product.entity';
import { User } from '../userEntity/user.entity';

@Entity()
@ObjectType()
export class Invoice extends AbstractEntity<Invoice> {
  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field()
  price: number;

  @Column({ default: 'Pending' })
  @Field({ defaultValue: 'Pending' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field({ defaultValue: new Date() })
  createdAt: Date;

  @ManyToMany(() => Product, (product) => product.invoices)
  @Field(() => [Product])
  @JoinTable({ name: 'invoice_product' })
  products: Product[];

  @ManyToOne(() => User, (user) => user.invoices)
  @Field(() => User)
  user: User;
}
