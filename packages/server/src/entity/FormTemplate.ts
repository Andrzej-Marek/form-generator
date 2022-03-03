import { Field, ObjectType } from '@nestjs/graphql';
import { FormBuilderConfig } from '@package/common';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { PublicId } from '../types/publicId';
import { DateFields } from './Common';

@ObjectType()
@Entity()
export class FormTemplate extends DateFields {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @Generated('uuid')
  formTemplateId!: PublicId;

  @Field()
  @Column({ type: 'jsonb' })
  template!: string;

  convertToFormTemplate(): FormBuilderConfig {
    return JSON.parse(this.template);
  }
}
