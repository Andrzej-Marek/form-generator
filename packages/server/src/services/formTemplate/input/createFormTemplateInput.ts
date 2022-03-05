import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFormTemplateInput {
  @Field({ description: 'JSON of form template' })
  template!: string;

  @Field({ nullable: true })
  label?: string;
}
