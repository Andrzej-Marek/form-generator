import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entity/User.entity';

@ObjectType()
export class MySession {
  @Field(() => String)
  userId!: User['id'];

  @Field(() => [String!], { nullable: true })
  formTemplatesIds?: string[];
}

@ObjectType()
export class MyNotProtectedSession {
  @Field(() => String, { nullable: true })
  userId?: User['id'];

  @Field(() => [String!], { nullable: true })
  formTemplatesIds?: string[];
}
