import { Query, Resolver } from '@nestjs/graphql';
import { FormTemplate } from 'src/entity/FormTemplate.entity';

@Resolver(() => String)
export class UserResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello';
  }
}
