import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { Role } from 'src/common/entity/authEntity/role.entity';
import { Cart } from 'src/common/entity/cartEntity/cart.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Invoice } from 'src/common/entity/invoiceEntity/invoice.entity';
import { Rate } from 'src/common/entity/rateEntity/rate.entity';

@Entity()
@ObjectType()
export class User extends AbstractEntity<User> {
  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  @Field(() => [Cart], { nullable: true })
  carts: Cart[];

  @OneToMany(() => Rate, (rate) => rate.user)
  @Field(() => [Rate], { nullable: true })
  rates: Rate[];

  @ManyToMany(() => Role, { cascade: true })
  @Field(() => [Role])
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => Invoice, (invoice) => invoice.user, { cascade: true })
  @Field(() => [Invoice], { nullable: true })
  invoices: Invoice[];
}
