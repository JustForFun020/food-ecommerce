import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/auth/entity/role.entity';
import { Cart } from 'src/cart/entity/cart.entity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Rate } from 'src/rate/entity/rate.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

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
}
