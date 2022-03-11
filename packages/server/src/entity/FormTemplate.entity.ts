import { Field, ObjectType } from '@nestjs/graphql';
import { FormBuilderConfig } from '@package/common';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InsertOmitFields } from './types';
import { User } from './User.entity';

export type InsertFormTemplate = Omit<
  FormTemplate,
  InsertOmitFields | 'convertToFormTemplate' | 'user' | 'published' | 'version'
>;

@ObjectType()
@Entity()
export class FormTemplate extends BaseEntity {
  constructor(input: InsertFormTemplate, user?: User) {
    super();
    Object.assign(this, input);
    if (user) {
      this.user = user;
    }
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'formTemplateId' };

  @Field()
  @Column({ type: 'jsonb' })
  template!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  label?: string;

  @Field()
  @Column({ default: false })
  published!: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.formTemplates, { nullable: true })
  user?: User;

  @Field()
  @Column({ default: 1 })
  version!: number;

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

  convertToFormTemplate(): FormBuilderConfig {
    return JSON.parse(this.template);
  }
}
