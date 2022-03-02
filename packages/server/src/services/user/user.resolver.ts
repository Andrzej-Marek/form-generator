import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => String)
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello';
  }
}
