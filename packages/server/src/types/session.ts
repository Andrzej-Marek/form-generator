import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entity/User.entity';

@ObjectType()
export class MySession {
  @Field(() => String)
  userId!: User['id'];
}
