import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Session } from 'src/decorators';
import { FormResponse, FormTemplate } from 'src/entity';
import { MyNotProtectedSession } from 'src/types';
import { FormResponseService } from './formResponse.service';
import { SendFormResponseInput } from './input';

@Resolver(() => FormResponse)
export class FormResponseResolver {
  constructor(private readonly formResponseService: FormResponseService) {}

  @Query(() => [FormResponse!]!)
  async collectFormResponses(
    @Args({ type: () => String, name: 'formTemplateId' })
    formTemplateId: FormTemplate['id'],
    @Session() session: MyNotProtectedSession,
  ): Promise<FormResponse[]> {
    return await this.formResponseService.collect(session, formTemplateId);
  }

  @Mutation(() => FormResponse)
  async sendFormResponse(
    @Args('input') input: SendFormResponseInput,
  ): Promise<FormResponse> {
    return await this.formResponseService.create(input);
  }
}
