import { Query, Resolver } from '@nestjs/graphql';
import { FormTemplate } from 'src/entity/FormTemplate';

@Resolver(() => FormTemplate)
export class FormTemplateResolver {
  @Query(() => FormTemplate)
  hello(): string {
    return 'Hello';
  }
}
