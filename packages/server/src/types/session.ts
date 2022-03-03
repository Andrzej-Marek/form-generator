import { Field, ObjectType } from '@nestjs/graphql';
import { PublicId } from './publicId';

@ObjectType()
export class MySession {
  @Field()
  userId!: PublicId;

  @Field({ nullable: true })
  shopId?: PublicId;

  @Field({ nullable: true })
  cartId?: PublicId;
}
