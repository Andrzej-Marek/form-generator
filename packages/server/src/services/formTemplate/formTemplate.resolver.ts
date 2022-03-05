import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Session } from 'src/decorators';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { SessionGuard } from 'src/guards';
import { MyContext, MyNotProtectedSession, MySession } from 'src/types';
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

  @UseGuards(SessionGuard)
  @Query(() => [FormTemplate!]!)
  async collectFormTemplates(
    @Session() session: MySession,
  ): Promise<FormTemplate[]> {
    console.log('session', session);
    return this.formTemplateService.collect(session.userId);
  }

  @Query(() => Boolean)
  async canEditFormTemplate(
    @Session() session: MyNotProtectedSession,
    @Args({ type: () => String, name: 'id' }) id: FormTemplate['id'],
  ): Promise<boolean> {
    console.log(session);
    return this.formTemplateService.canEdit(id, session);
  }

  @Mutation(() => FormTemplate)
  async publishFormTemplate(
    @Session() session: MyNotProtectedSession,
    @Args({ type: () => String, name: 'id' }) id: FormTemplate['id'],
  ): Promise<FormTemplate> {
    return await this.formTemplateService.publish(session, id);
  }

  @Mutation(() => FormTemplate)
  async unPublishFormTemplate(
    @Session() session: MyNotProtectedSession,
    @Args({ type: () => String, name: 'id' }) id: FormTemplate['id'],
  ): Promise<FormTemplate> {
    return await this.formTemplateService.unPublish(session, id);
  }

  @Mutation(() => FormTemplate)
  async saveFormTemplate(
    @Session() session: MyNotProtectedSession,
    @Args('input') input: SaveFormTemplateInput,
  ): Promise<FormTemplate> {
    return await this.formTemplateService.update(input, session);
  }

  @Mutation(() => FormTemplate)
  async createFormTemplate(
    @Context() context: MyContext,
    @Session() session: MyNotProtectedSession,
    @Args('input') input: CreateFormTemplateInput,
  ): Promise<FormTemplate> {
    return await this.formTemplateService.create(
      context.req,
      input,
      session.userId,
    );
  }

  @UseGuards(SessionGuard)
  @Mutation(() => Boolean)
  async deleteFormTemplate(
    @Args({ type: () => String, name: 'id' }) id: FormTemplate['id'],
  ): Promise<boolean> {
    return await this.formTemplateService.delete(id);
  }
}
