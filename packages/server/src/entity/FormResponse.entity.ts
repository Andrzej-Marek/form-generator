import { Field, ObjectType } from '@nestjs/graphql';
import { FormBuilderConfig } from '@package/common';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FormTemplate } from './FormTemplate.entity';
import { InsertOmitFields } from './types';

export type InsertFormResponse = Omit<
  FormResponse,
  InsertOmitFields | 'convertToFormTemplate' | 'formTemplate' | 'formTemplateId'
>;

@ObjectType()
@Entity()
export class FormResponse extends BaseEntity {
  constructor(input: InsertFormResponse, formTemplate: FormTemplate) {
    super();
    Object.assign(this, input);
    this.formTemplate = formTemplate;
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'formResponseId' };

  @Field()
  @Column({ type: 'jsonb' })
  response!: string;

  @Field()
  @Column()
  formVersion!: number;

  @Field(() => Date)
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @Column()
  formTemplateId!: FormTemplate['id'];

  @ManyToOne(() => FormTemplate)
  formTemplate!: FormTemplate;

  convertToFormTemplate(): FormBuilderConfig {
    return JSON.parse(this.response);
  }
}
