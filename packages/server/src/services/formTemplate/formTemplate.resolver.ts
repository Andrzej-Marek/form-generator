import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { FormTemplateService } from './formTemplate.service';
import { CreateFormTemplateInput, SaveFormTemplateInput } from './input';

@Resolver(() => FormTemplate)
export class FormTemplateResolver {
  constructor(private formTemplateService: FormTemplateService) {}

  @Query(() => FormTemplate)
  async getFormTemplate(
    @Args({ type: () => String, name: 'id' }) id: FormTemplate['id'],
  ): Promise<FormTemplate> {
    return this.formTemplateService.getById(id);
  }

  @Mutation(() => FormTemplate)
  async saveFormTemplate(
    @Args('input') input: SaveFormTemplateInput,
  ): Promise<FormTemplate> {
    return await this.formTemplateService.update(input);
  }

  @Mutation(() => FormTemplate)
  async createFormTemplate(
    @Args('input') input: CreateFormTemplateInput,
  ): Promise<FormTemplate> {
    return await this.formTemplateService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteFormTemplate(
    @Args({ type: () => String, name: 'id' }) id: FormTemplate['id'],
  ): Promise<boolean> {
    return await this.formTemplateService.delete(id);
  }
}
