import { Field, InputType } from '@nestjs/graphql';
import { FormTemplate } from 'src/entity';

@InputType()
export class SendFormResponseInput {
  @Field({ description: 'JSON of form template' })
  response!: string;

  @Field(() => String)
  formTemplateId!: FormTemplate['id'];

  @Field(() => Number)
  formVersion!: number;
}
