import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

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

  @ManyToOne(() => Cart, (cart) => cart.invoice)
  @Field(() => Cart)
  cart: Cart;
}
