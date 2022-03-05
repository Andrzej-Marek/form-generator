import { Field, InputType } from '@nestjs/graphql';
import { FormTemplate } from 'src/entity/FormTemplate.entity';
import { CreateFormTemplateInput } from './CreateFormTemplateInput';

@InputType()
export class SaveFormTemplateInput extends CreateFormTemplateInput {
  @Field(() => String)
  id!: FormTemplate['id'];
}
